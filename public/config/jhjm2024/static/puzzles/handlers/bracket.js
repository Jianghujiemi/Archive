
// Bracket Puzzle Handler - Static Version
(function() {
    'use strict';
    
    const D = {"level_0_box_0": {"expected_length": 7, "position": [5, 6], "poetry": "青虬紫燕坐春风"}, "level_0_box_1": {"expected_length": 7, "position": [5, 6], "poetry": "桃花依旧笑春风"}, "level_0_box_2": {"expected_length": 5, "position": [3, 4], "poetry": "烽火连三月"}, "level_0_box_3": {"expected_length": 7, "position": [2, 3], "poetry": "烟花三月下扬州"}, "level_0_box_4": {"expected_length": 7, "position": [2, 3], "poetry": "长安古道马迟迟"}, "level_0_box_5": {"expected_length": 5, "position": [3, 4], "poetry": "远芳侵古道"}, "level_0_box_6": {"expected_length": 7, "position": [4, 5], "poetry": "无边落木萧萧下"}, "level_0_box_7": {"expected_length": 7, "position": [4, 5], "poetry": "衙斋卧听萧萧竹"}, "level_0_box_8": {"expected_length": 5, "position": [3, 4], "poetry": "海上生明月"}, "level_0_box_9": {"expected_length": 5, "position": [4, 5], "poetry": "二十四桥明月夜"}, "level_0_box_10": {"expected_length": 5, "position": [3, 4], "poetry": "横剑别妻子"}, "level_0_box_11": {"expected_length": 7, "position": [2, 3], "poetry": "耶娘妻子走相送"}, "level_0_box_12": {"expected_length": 7, "position": [4, 5], "poetry": "地崩山摧壮士死"}, "level_0_box_13": {"expected_length": 5, "position": [3, 4], "poetry": "千秋二壮士"}, "level_0_box_14": {"expected_length": 7, "position": [2, 3], "poetry": "泉眼无声惜细流"}, "level_0_box_15": {"expected_length": 5, "position": [3, 4], "poetry": "润物细无声"}, "level_0_box_16": {"expected_length": 4, "position": [0, 1], "poetry": "杨柳依依"}, "level_0_box_17": {"expected_length": 7, "position": [4, 5], "poetry": "扬子江头杨柳春"}, "level_0_box_18": {"expected_length": 5, "position": [2, 3], "poetry": "使我不得开心颜"}, "level_0_box_19": {"expected_length": 7, "position": [2, 3], "poetry": "夜夜不得息"}, "level_0_box_20": {"expected_length": 7, "position": [4, 5], "poetry": "梅子黄时日日晴"}, "level_0_box_21": {"expected_length": 5, "position": [0, 1], "poetry": "日日思君不见君"}, "level_0_box_22": {"expected_length": 7, "position": [0, 1], "poetry": "白云一片去悠悠"}, "level_0_box_23": {"expected_length": 7, "position": [4, 5], "poetry": "黄河远上白云间"}, "level_0_box_24": {"expected_length": 5, "position": [2, 3], "poetry": "天下三分明月夜"}, "level_0_box_25": {"expected_length": 5, "position": [2, 3], "poetry": "功盖三分国"}, "level_0_box_26": {"expected_length": 5, "position": [2, 3], "poetry": "飞入菜花无处寻"}, "level_0_box_27": {"expected_length": 7, "position": [4, 5], "poetry": "桃花净尽菜花开"}, "level_0_box_28": {"expected_length": 7, "position": [0, 1], "poetry": "二月春风似剪刀"}, "level_0_box_29": {"expected_length": 5, "position": [2, 3], "poetry": "能开二月花"}, "level_0_box_30": {"expected_length": 7, "position": [4, 5], "poetry": "白雪却嫌春色晚"}, "level_0_box_31": {"expected_length": 5, "position": [0, 1], "poetry": "春色满园关不住"}, "level_1_box_0": {"expected_length": 7, "position": [6], "poetry": "散入春风满洛城"}, "level_1_box_1": {"expected_length": 7, "position": [4], "poetry": "三月咸阳城"}, "level_1_box_2": {"expected_length": 7, "position": [5], "poetry": "古道西风瘦马"}, "level_1_box_3": {"expected_length": 7, "position": [3], "poetry": "萧萧班马鸣"}, "level_1_box_4": {"expected_length": 7, "position": [2], "poetry": "明月何时照我还"}, "level_1_box_5": {"expected_length": 7, "position": [5], "poetry": "却看妻子愁何在"}, "level_1_box_6": {"expected_length": 7, "position": [6], "poetry": "若非壮士全师胜"}, "level_1_box_7": {"expected_length": 7, "position": [4], "poetry": "此时无声胜有声"}, "level_1_box_8": {"expected_length": 7, "position": [1], "poetry": "吹面不寒杨柳风"}, "level_1_box_9": {"expected_length": 7, "position": [3], "poetry": "君王掩面救不得"}, "level_1_box_10": {"expected_length": 7, "position": [1], "poetry": "朝回日日典春衣"}, "level_1_box_11": {"expected_length": 7, "position": [0], "poetry": "回首白云低"}, "level_1_box_12": {"expected_length": 7, "position": [3], "poetry": "梅须逊雪三分白"}, "level_1_box_13": {"expected_length": 7, "position": [2], "poetry": "麦花雪白菜花稀"}, "level_1_box_14": {"expected_length": 7, "position": [0], "poetry": "草长莺飞二月天"}, "level_1_box_15": {"expected_length": 7, "position": [3], "poetry": "映阶碧草自春色"}, "level_2_box_0": {"expected_length": 7, "position": [5, 6], "poetry": "洛阳城里见秋风"}, "level_2_box_1": {"expected_length": 7, "position": [2, 3], "poetry": "铁马秋风大散关"}, "level_2_box_2": {"expected_length": 7, "position": [3, 4], "poetry": "何似在人间"}, "level_2_box_3": {"expected_length": 7, "position": [3, 4], "poetry": "便胜却人间无数"}, "level_2_box_4": {"expected_length": 7, "position": [0, 1], "poetry": "等闲识得东风面"}, "level_2_box_5": {"expected_length": 7, "position": [4, 5], "poetry": "潇湘何事等闲回"}, "level_2_box_6": {"expected_length": 7, "position": [0, 1], "poetry": "北风吹雁雪纷纷"}, "level_2_box_7": {"expected_length": 7, "position": [0, 1], "poetry": "北风卷地白草折"}, "level_3_box_0": {"expected_length": 7, "position": [4], "poetry": "秋风吹不尽"}, "level_3_box_1": {"expected_length": 7, "position": [6], "poetry": "人间四月芳菲尽"}, "level_3_box_2": {"expected_length": 7, "position": [0], "poetry": "烈火焚烧若等闲"}, "level_3_box_3": {"expected_length": 7, "position": [0], "poetry": "烈烈北风凉"}, "level_4_box_0": {"expected_length": 7, "position": [1, 2], "poetry": "尽西风"}, "level_4_box_1": {"expected_length": 7, "position": [0, 1], "poetry": "西风烈"}};
    const INPUT_SLUTS = ["level_0_box_0", "level_0_box_1", "level_0_box_2", "level_0_box_3", "level_0_box_4", "level_0_box_5", "level_0_box_6", "level_0_box_7", "level_0_box_8", "level_0_box_9", "level_0_box_10", "level_0_box_11", "level_0_box_12", "level_0_box_13", "level_0_box_14", "level_0_box_15", "level_0_box_16", "level_0_box_17", "level_0_box_18", "level_0_box_19", "level_0_box_20", "level_0_box_21", "level_0_box_22", "level_0_box_23", "level_0_box_24", "level_0_box_25", "level_0_box_26", "level_0_box_27", "level_0_box_28", "level_0_box_29", "level_0_box_30", "level_0_box_31", "level_1_box_0", "level_1_box_1", "level_1_box_2", "level_1_box_3", "level_1_box_4", "level_1_box_5", "level_1_box_6", "level_1_box_7", "level_1_box_8", "level_1_box_9", "level_1_box_10", "level_1_box_11", "level_1_box_12", "level_1_box_13", "level_1_box_14", "level_1_box_15", "level_2_box_0", "level_2_box_1", "level_2_box_2", "level_2_box_3", "level_2_box_4", "level_2_box_5", "level_2_box_6", "level_2_box_7", "level_3_box_0", "level_3_box_1", "level_3_box_2", "level_3_box_3", "level_4_box_0", "level_4_box_1"];
    const OUTPUT_SLUTS = ["level_5_cir_0", "level_4_cir_1", "level_4_cir_0", "level_3_cir_3", "level_3_cir_2", "level_3_cir_1", "level_3_cir_0", "level_2_cir_7", "level_2_cir_6", "level_2_cir_5", "level_2_cir_4", "level_2_cir_3", "level_2_cir_2", "level_2_cir_1", "level_2_cir_0", "level_1_cir_9", "level_1_cir_8", "level_1_cir_7", "level_1_cir_6", "level_1_cir_5", "level_1_cir_4", "level_1_cir_3", "level_1_cir_2", "level_1_cir_15", "level_1_cir_14", "level_1_cir_13", "level_1_cir_12", "level_1_cir_11", "level_1_cir_10", "level_1_cir_1", "level_1_cir_0"];
    
    function operatorBox(cfg0, cfg1, inStr0, inStr1) {
        const expectedLength0 = cfg0.poetry.length;
        let revealedWord0;
        if (inStr0 === "") {
            revealedWord0 = "";
        } else if (inStr0.length !== expectedLength0) {
            revealedWord0 = null;
        } else {
            revealedWord0 = cfg0.position.map(pos => inStr0[pos]).join('');
        }
        
        const expectedLength1 = cfg1.poetry.length;
        let revealedWord1;
        if (inStr1 === "") {
            revealedWord1 = "";
        } else if (inStr1.length !== expectedLength1) {
            revealedWord1 = null;
        } else {
            revealedWord1 = cfg1.position.map(pos => inStr1[pos]).join('');
        }
        
        let revealedWord;
        if (revealedWord0 === null || revealedWord1 === null) {
            revealedWord = "错啦".slice(0, cfg0.position.length);
        } else if (revealedWord0 === "") {
            revealedWord = revealedWord1;
        } else if (revealedWord1 === "") {
            revealedWord = revealedWord0;
        } else if (revealedWord0 === revealedWord1) {
            revealedWord = revealedWord0;
        } else {
            revealedWord = "错啦".slice(0, cfg0.position.length);
        }
        
        return revealedWord;
    }
    
    function refreshState(requestBody) {
        const retDict = {};
        for (const outputSlut of OUTPUT_SLUTS) {
            const outLvl = parseInt(outputSlut[6]);
            const outIdx = parseInt(outputSlut.slice(12));
            const inLvl = outLvl - 1;
            const inIdx0 = 2 * outIdx;
            const inIdx1 = 2 * outIdx + 1;
            const inSlut0 = `level_${inLvl}_box_${inIdx0}`;
            const inSlut1 = `level_${inLvl}_box_${inIdx1}`;
            
            const cfg0 = D[inSlut0];
            const cfg1 = D[inSlut1];
            const inStr0 = requestBody[inSlut0] || "";
            const inStr1 = requestBody[inSlut1] || "";
            const revealedWord = operatorBox(cfg0, cfg1, inStr0, inStr1);
            retDict[outputSlut] = revealedWord;
        }
        return retDict;
    }
    
    window.bracketRefreshState = refreshState;
})();
