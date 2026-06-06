<template>
    <div :class="{ 'body': true, 'blur': isBannerVisible }">
    </div>
    <div :class="{ 'area-banner': true, 'area-banner-hidden': !isBannerVisible }">
        <img :src="banner" alt="区域立绘"></img>
    </div>
    <div class="navi-container">
        <div class="row header-line">
            <ul class="col link-button-wrapper">
                <li class="sp-li">
                    <div class="link sp-title">
                        <img v-if="logoImg" class="link-logo" :src="logoImg"></img>
                        <div class="link-title">
                            <h2>{{ data.title }}</h2>
                        </div>
                    </div>
                    <div class="link-desc" v-html="descHtml"></div>
                </li>
                <li v-for="link in data.links" :class="{ 'link-li': true, 'link-nav': !isques(link) }"
                    @click="navigate(link.path, link?.ext ?? false)">
                    <div class="link-title">
                        {{ link.title }}
                    </div>
                </li>
            </ul>
            <div class="site-info" @click="navigate('/')">Powered by EterIll's PH Archive with CCXCArchiveEvolved</div>
        </div>


        <div :class="{ 'loader': true, 'loading': loading }">
            <div class="loading-tip"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="">
                    <animateTransform xmlns="http://www.w3.org/2000/svg" attributeName="transform" attributeType="XML"
                        type="rotate" from="360" to="0" dur="1.0s" repeatCount="indefinite" />
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                加载中……请稍后……</div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
//import { useRoute, useRouter } from 'vue-router'

import { getMainInfo } from '../api';
import { useTheme } from '../dataschem/theme';
import { AreaLink, IndexData } from '../dataschem/interfaces';

import { markdownToHtml } from "../utils";

const route = useRoute();
const router = useRouter();

const data = reactive<IndexData>({ title: '', content: '', links: [], navs: [] });
const loading = ref(true);
const isBannerVisible = ref(false);
const banner = ref('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

const theme = useTheme();

const bgImg = ref('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
const logoImg = ref('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
const bgSnap = ref(0);
const descHtml = ref('')

onBeforeMount(async () => {
    var hunt = route.params.hunt as string;
    if (!hunt) return;
    await theme.update(hunt)
    let huntTheme = theme.themes[hunt];
    console.debug(huntTheme?.root ?? "No root theme def!!!");
    bgImg.value = `url("${huntTheme?.root?.banner ?? bgImg.value}")`;
    logoImg.value = huntTheme?.root?.logo ?? "";
    bgSnap.value = huntTheme?.root?.snapMargin ?? 40;
})

const isques = (item: AreaLink) => {
    return !!(item?.pgid ?? false);
}

async function loadDetail() {
    console.log("site-render");

    const adata = await getMainInfo(route.params.hunt as string ?? "");

    console.debug(adata);

    Object.assign(data, adata);
}

const navigate = (path: string, ext?: boolean) => {
    if (!ext) { ext = false }
    if (ext) {
        const a = document.createElement('a');
        a.href = path;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {

        router.push(path);
    }
}

//const route = useRoute();
//const router = useRouter();

onMounted(async () => {
    await loadDetail();
    descHtml.value = markdownToHtml(data.content);
    loading.value = false;
});

</script>

<style lang="scss" scoped>
.page-title {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    pointer-events: none;
    transition: all ease .4s;
}

.area-banner {
    display: flex;
    position: fixed;
    right: 3rem;
    max-height: 800px;
    max-width: 400px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ffffff66;
    backdrop-filter: blur(10px);
    box-shadow: #fff 0 0 2rem;
    border: #fff 2px solid;
    border-radius: 2rem;
    overflow: hidden;
    width: 30vw;
    height: auto;
    transition: all ease 0.5s;

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}

.area-banner-hidden {
    opacity: 0;
}

.body {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: -1;
    transition: filter ease 1s;
}

.body::before {
    content: "";
    background: v-bind(bgImg) no-repeat right bottom / cover;
    opacity: .6;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: -3;
    transition: all ease .3s, margin-right ease-in-out .15s;
}


@media (max-width: 800px) {
    .body::before {
        margin-right: calc(-1vh * v-bind(bgSnap));
    }
}

.body.blur::before {
    filter: blur(12px);
}


.navi-container {
    margin: 0;
    margin-right: 40%;
    padding: 1rem;
    min-height: calc(100vh - 2rem);
    top: 0;
    color: #111;
}

.navi-container .loader::before {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 800;
    transition: backdrop-filter 1s ease;
    pointer-events: none;
}

.navi-container .loader>.loading-tip {
    z-index: 900;
    position: relative;
    opacity: 0%;
    transition: all .8s ease;
}

.navi-container .loader {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    pointer-events: none;
}

.navi-container .loader.loading>.loading-tip {
    opacity: 100%;
}

.navi-container .loader.loading::before {
    backdrop-filter: blur(15px);
    pointer-events: all;
}

.navi-container .link-li {
    display: flex;
    padding-left: 1rem;
    padding-right: 0;
    cursor: pointer;
    color: #000;
    background: linear-gradient(to right, #ffffffdd 0%, #ffffffbb 60%, #ffffff33 85%, #ffffff00 100%);
    border-radius: 12px;
    align-items: center;
    min-height: 5rem;
    transition: all ease .5s;

    .link-title {
        display: flex;
        padding: 0;
        font-size: 1.6rem;
        font-weight: bold;
        align-items: center;
        line-height: 1.8rem;
    }
}

.link-nav {
    background: linear-gradient(to right, #e6e6e6dd 0%, #e6e6e6bb 60%, #e6e6e633 85%, #e6e6e600 100%) !important;
}

.sp-li {
    .sp-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

        .link-logo {
            max-height: 4rem;
            max-width: 4rem;
            object-fit: cover;
            height: auto;
            width: auto;
        }
    }
}


@media (max-width: 1000px) {
    .navi-container .page-title {
        opacity: 0;
    }
}

.site-info {
    cursor: pointer;
    margin: 1rem;
}
</style>