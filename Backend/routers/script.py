from selenium import webdriver 
from dotenv import load_dotenv
from selenium.webdriver import ActionChains
import os 
import time 
import sys 

repoName = sys.argv[1]

BASEDIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASEDIR, '.env'))

pwd = os.getenv("PWDI")
login = os.getenv("LOGIN")

browser = webdriver.Chrome(executable_path='/home/nopc/Downloads/chromedriver_linux64/chromedriver')

#repoName = 'https://github.com/crusher-pb/Repository1'

browser.get(repoName)

elem = browser.find_element_by_link_text('Sign in')

elem.click()

# <input type="text" name="login" id="login_field" class="form-control input-block" tabindex="1" autocapitalize="off" autocorrect="off" autocomplete="username" autofocus="autofocus">
# <input type="password" name="password" id="password" class="form-control form-control input-block" tabindex="2" autocomplete="current-password">
# <input type="submit" name="commit" value="Sign in" tabindex="3" class="btn btn-primary btn-block" data-disable-with="Signing in…">
loginCred = browser.find_element_by_id('login_field')
passCred = browser.find_element_by_id('password')

loginCred.send_keys(login)
passCred.send_keys(pwd)

signin = browser.find_element_by_xpath('//*[@id="login"]/form/div[4]/input[9]')

signin.click()


# time.sleep(120)

issues = browser.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[2]/nav/ul/li[2]/a/span')

issues.click()

# //*[@id="js-repo-pjax-container"]/div[3]/div/div/div[1]/div[2]/a/span[1]
# //*[@id="js-repo-pjax-container"]/div[3]/div/div/div[2]/div[2]/a/span[1]
# //*[@id="js-repo-pjax-container"]/div[3]/div/div/div[2]/div[2]/a

# newIssue = browser.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[3]/div/div/div[1]/div[2]/a/span[1]')


# newIssue.click()

raisingIssue = repoName + '/issues/new/choose'

browser.get(raisingIssue)

# <input class="form-control input-lg input-block input-contrast required title js-session-resumable js-quick-submit" required="required" autofocus="autofocus" autocomplete="off" placeholder="Title" aria-label="Title" data-repository-id="MDEwOlJlcG9zaXRvcnkyNzg0MjU0NDc=" type="text" name="issue[title]" id="issue_title">
issueTitle = browser.find_element_by_id('issue_title')

issueTitle.send_keys("Title : I am a Bot Part 1  !!! ")

# <textarea name="issue[body]" id="issue_body" placeholder="Leave a comment" aria-label="Comment body" data-replace-attribute="id" data-replace-attribute-template="new_comment_$id_field" class="form-control input-contrast comment-form-textarea js-comment-field js-paste-markdown js-task-list-field js-quick-submit js-size-to-fit js-session-resumable js-saved-reply-shortcut-comment-field" style="max-height: 298px; height: 198px;"></textarea>

issueBody = browser.find_element_by_id('issue_body')
issueBody.send_keys("Body: Bot Body Part 2 !!! ")

# //*[@id="new_issue"]/div/div/div[1]/div/div[1]/div[2]/button

submitButton = browser.find_element_by_xpath('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div[2]/button')

submitButton.click()

print("Script Executed Successfully !!!!")