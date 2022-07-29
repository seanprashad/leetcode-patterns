import requests
from urllib.parse import urlparse
from questions import questions

query = '''query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    difficulty
  }
}
'''

for question in questions:
    p = urlparse(question["url"])
    title_slug = p.path.rstrip('/').split('/')[-1]
    our_difficulty = question["difficulty"]
    variables = {"titleSlug": title_slug}

    response = requests.post("https://leetcode.com/graphql",
        json={"query": query, "variables": variables}
    )

    their_difficulty = response.json()["data"]["question"]["difficulty"]

    if their_difficulty != our_difficulty:
        print(f'{question["name"]}: {our_difficulty} -> {their_difficulty}')

print("Finished checking all questions")