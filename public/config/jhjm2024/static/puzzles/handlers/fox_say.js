
// FoxSay Puzzle Handler - Static Version
(function() {
    'use strict';
    
    const ANSWERS = {"0": "碧蓝航线", "1": "过年好", "2": "壶壶", "3": "海角七号", "4": "孔融让梨", "5": "蓝猫", "6": "老舍", "7": "旗袍", "8": "秋田犬", "9": "史蒂芬霍金", "10": "武汉大学", "11": "小美人鱼", "12": "新浪微博", "13": "辛普森一家", "14": "中元节", "15": "浙江大学"};
    const REFLECTIONS = {"0": "因为练得多啊，天天练，天天练，这操作已经深入我的骨髓了。", "1": "不用具体形容，也不用具体比较，我也对你有非常强烈的感觉。", "2": "请帮我整理一下小白狐主持的答题节目里的历届冠军题吧！他们对应的冠军感言似乎全出问题了！", "3": "因为我不住在海边啊，而且我觉得这东西也不算稀罕吧，就一贝壳。", "4": "它是一个藏在互联网里的世界，里面有着穿着银色锡箔衣服的外星人和聪明的老爷爷。", "5": "那得是三一重工，专门做泥头车的，制造能力那是刚刚的。", "6": "都没有，看来君子之道还是算遵守了。还是要每天多反思反思。", "7": "感觉春熙路上全是，到处都是一帮喝醉的人。", "8": "随着时间，下一代的教授会培养出更优秀的人才。所以我相信未来会更好。", "9": "以一天比喻一生，此乃我等人类。", "10": "你刚被对面一套技能秒了，不过临死前把对面输出带走了。", "11": "反正不是王一博，也不是胡歌，找个你能见到的男人吧，别做梦了。", "12": "虽然它确保了制空权，也拥有喷火的能力，不过它还是不够敏捷，可以用机动部队速攻来取胜。", "13": "此乃：一曰傲雪，二曰识途，三曰冰寒。", "14": "根据法律来讲，任何非法占有行为都是算的。", "15": "我这么可爱的女孩子，当然早上是草莓，中午是草莓，晚上也是草莓啦~"};
    
    let questionSolveStatus = 0;
    let answers_solved = ["","","","","","","","","","","","","","","",""];
    let reflections_solved = ["","","","","","","","","","","","","","","",""];
    let currentActiveQuestion = 0;
    
    function decodeQuestionText(cipher) {
        return new TextDecoder().decode(Uint8Array.from(atob(cipher), (m) => m.codePointAt(0)));
    }
    
    function switchQuestion(questionId) {
        for (let i = 0; i < 16; i++) $('#q' + i).removeClass('selected-question');
        if (!(typeof questionId === 'number' && questionId >= 0 && questionId <= 15)) return;
        
        const questionHint1 = decodeQuestionText(hint1_texts[questionId]);
        const questionHint2 = decodeQuestionText(hint2_texts[questionId]);
        $('#hint1').text(questionHint1);
        $('#hint2').text(questionHint2);
        
        const questionSolved = questionSolveStatus & (1 << questionId);
        if (questionSolved) {
            $('#guess').val(answers_solved[questionId]);
            $('#reflection').text(reflections_solved[questionId]);
            $('#guess').prop('disabled', true);
            $('#submit').prop('disabled', true);
            $('#guess-reflection').text("正确！");
            $('#guess-reflection').removeClass('alert-danger');
            $('#guess-reflection').addClass('alert-success');
            $('#guess-result').removeClass('d-none');
            $('#reflection-container').removeClass('d-none');
        } else {
            $('#guess').val("");
            $('#guess').prop('disabled', false);
            $('#submit').prop('disabled', false);
            $('#guess-result').addClass('d-none');
            $('#reflection-container').addClass('d-none');
        }
        $('#q' + questionId).addClass('selected-question');
        currentActiveQuestion = questionId;
    }
    
    function submit() {
        $('#guess').prop("disabled", true);
        $('#submit').prop("disabled", true);
        
        const guess = $('#guess').val();
        const isCorrect = ANSWERS[currentActiveQuestion] === guess;
        
        if (isCorrect) {
            $('#guess-reflection').text("正确！");
            $('#q' + currentActiveQuestion).addClass('solved-question');
            $('#reflection-container').removeClass('d-none');
            $('#reflection').text(REFLECTIONS[currentActiveQuestion]);
            questionSolveStatus |= (1 << currentActiveQuestion);
            answers_solved[currentActiveQuestion] = ANSWERS[currentActiveQuestion];
            reflections_solved[currentActiveQuestion] = REFLECTIONS[currentActiveQuestion];
            $('#guess-reflection').removeClass('alert-danger');
            $('#guess-reflection').addClass('alert-success');
        } else {
            $('#guess-reflection').text("错误！");
            $('#guess-reflection').addClass('alert-danger');
            $('#guess-reflection').removeClass('alert-success');
        }
        
        $('#guess-result').removeClass('d-none');
        $('#guess').prop("disabled", false);
        $('#submit').prop("disabled", false);
    }
    
    function init() {
        $('#submit-form').on('submit', submit);
        for (let i = 0; i < 16; i++) {
            $('#q'+i).on('click', () => switchQuestion(i));
        }
        switchQuestion(0);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
