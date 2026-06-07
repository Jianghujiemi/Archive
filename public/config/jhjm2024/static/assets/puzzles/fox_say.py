import traceback
import json
from django.views.decorators.http import require_GET, require_POST
from django.db import transaction
from puzzles.messaging import log_puzzle_info
from puzzles.models import FoxsayState
from puzzles.views import validate_puzzle

answers = {
    0: '碧蓝航线',
    1: '过年好',
    2: '壶壶',
    3: '海角七号',
    4: '孔融让梨',
    5: '蓝猫',
    6: '老舍',
    7: '旗袍',
    8: '秋田犬',
    9: '史蒂芬霍金',
    10: '武汉大学',
    11: '小美人鱼',
    12: '新浪微博',
    13: '辛普森一家',
    14: '中元节',
    15: '浙江大学',
}

reflections = {
    0: '因为练得多啊，天天练，天天练，这操作已经深入我的骨髓了。',
    1: '不用具体形容，也不用具体比较，我也对你有非常强烈的感觉。',
    2: '请帮我整理一下小白狐主持的答题节目里的历届冠军题吧！他们对应的冠军感言似乎全出问题了！',
    3: '因为我不住在海边啊，而且我觉得这东西也不算稀罕吧，就一贝壳。',
    4: '它是一个藏在互联网里的世界，里面有着穿着银色锡箔衣服的外星人和聪明的老爷爷。',
    5: '那得是三一重工，专门做泥头车的，制造能力那是刚刚的。',
    6: '都没有，看来君子之道还是算遵守了。还是要每天多反思反思。',
    7: '感觉春熙路上全是，到处都是一帮喝醉的人。',
    8: '随着时间，下一代的教授会培养出更优秀的人才。所以我相信未来会更好。',
    9: '以一天比喻一生，此乃我等人类。',
    10: '你刚被对面一套技能秒了，不过临死前把对面输出带走了。',
    11: '反正不是王一博，也不是胡歌，找个你能见到的男人吧，别做梦了。',
    12: '虽然它确保了制空权，也拥有喷火的能力，不过它还是不够敏捷，可以用机动部队速攻来取胜。',
    13: '此乃：一曰傲雪，二曰识途，三曰冰寒。',
    14: '根据法律来讲，任何非法占有行为都是算的。',
    15: '我这么可爱的女孩子，当然早上是草莓，中午是草莓，晚上也是草莓啦~',
}

@require_POST
def result(request):
    try:
        user_team = request.context.team
        
        # Fetch the solved status of this team. If there isn't, create a record
        try:
            team_result, _ = FoxsayState.objects.get_or_create(team_id=user_team.id, defaults={'subques': 0})
        except:
            traceback.print_exc()
            print("Team Fetch Result Error")
            return {
                "error": "",
                "puzzles": [],
            } 
        
        puzzles = [({"solved": True, "answer": answers[subquestion], "reflection": reflections[subquestion]}) if bool(team_result.subques & (1 << subquestion)) else ({"solved": False, "answer": "", "reflection": ""}) for subquestion in range(16)]
            
        return {
            "error": "",
            "puzzles": puzzles,
        } 
            
    except:
        traceback.print_exc()

        return {'error': 'An error occurred!', "puzzles": []}
    

@require_POST
def submit(request):
    try:
        body = json.loads(request.body)
        
        user_team = request.context.team
        if user_team is None:
            raise Exception("No team")
        team_name = user_team.team_name if user_team else "<noname>"

        subq_index = int(body['subq'])
        guess = body['guess']
        
        correct = answers[subq_index] == guess
        log_puzzle_info("FoxSay", team_name, f"Guessed {guess} for question {subq_index+1}. " + ("Right!" if correct else "Wrong!"))

        if not correct:
            return {
                "solved": False,
                "answer": "",
                "reflection": "",
                "error": "",
            }
        
        with transaction.atomic():
            try:
                team_result, _ = FoxsayState.objects.get_or_create(team_id=user_team.id, defaults={'subques': 0})
                subques_solved = bool(team_result.subques & (1 << subq_index))
                if not subques_solved:
                    team_result.update_time = request.context.now
                    team_result.subques = team_result.subques | (1 << subq_index)
                    team_result.save()
            except:
                traceback.print_exc()
                return {
                    "solved": False,
                    "answer": "",
                    "reflection": "",
                    "error": "Interal Error, please contact staff.",
                }
        
        return {
            "solved": True,
            "answer": answers[subq_index],
            "reflection": reflections[subq_index],
            "error": "",
        }
    except (KeyError, AttributeError):
        # This error handling is pretty rough.
        return {
            "solved": False,
            "answer": "",
            "reflection": "",
            "error": "Please submit a well-formed response.",
        }
    except (ValueError, IndexError):
        return {
            "solved": False,
            "answer": "",
            "reflection": "",
            "error": "Incorrect subquestion index.",
        }
    except:
        traceback.print_exc()
        
        return {
            "solved": False,
            "answer": "",
            "reflection": "",
            "error": "Error Occured. Please Contact Staff.",
        }
        