import traceback
import json
from django.http import JsonResponse
from django.views.decorators.http import require_POST

correct_choices = [
    "5", "4", "5",
    "3", "2", "1",
    "4", "3", "4",
    "1", "5", "2",
    "2", "1", "3",
]
correct_username = "anbichenduer"
correct_password = "laptop"


def login_check(username, password) -> bool:
    return (username == correct_username) and (password == correct_password)

def choices_check(choices) -> bool:
    if len(choices) != len(correct_choices):
        return False
    
    for idx in range(len(choices)):
        choice = choices[idx]
        correct_choice = correct_choices[idx]
        if correct_choice != choice:
            return False
    
    return True


def parse_and_check(request_body: dict) -> bool:
    stage = request_body.get("stage")
    if stage == "1":
        username = request_body.get("username")
        password = request_body.get("password")
        return login_check(username, password)
    elif stage == "2":
        choices = request_body.get("choices")
        print(choices)
        return choices_check(choices)
    else:
        print("四弦战士来啦！")
        print(request_body)
        return False



@require_POST
def submit(request):
    try:
        data = json.loads(request.body)
        print(data)
        if 'passed_stage1' not in request.session or (not request.session['passed_stage1']):
            try:
                username = data.get('username')
                password = data.get('password')
                solve_flag = login_check(username, password)
                if solve_flag:
                    request.session['passed_stage1'] = True
                else:
                    return {
                        "error": "登录失败。"
                    }
            except:
                return {
                    "error": "登录失败。"
                }
        elif 'passed_stage2' not in request.session or (not request.session['passed_stage2']):
            try:
                choices = []
                for i in range(1, 16): 
                    choice = data.get(f'choice{i}')
                    choices.append(choice)
                solve_flag = choices_check(choices)
                if solve_flag:
                    request.session['passed_stage2'] = True
                else:
                    return {
                        "error": "提交失败。"
                    }
            except:
                return {
                    "error": "提交失败。"
                }

        return {
            "error": "",
        }
    except Exception as e:
        traceback.print_exc()
        return {
            "error": f"Error Occured. Please Contact Staff. {str(e)}",
        }
