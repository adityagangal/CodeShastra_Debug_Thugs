from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, get_key
from langchain.schema import HumanMessage, AIMessage
from langchain_community.chat_models.huggingface import ChatHuggingFace
from langchain.prompts import PromptTemplate
from langchain_community.llms import HuggingFaceHub

import os

load_dotenv()
key = get_key(key_to_get="HUGGINGFACEHUB_API_KEY", dotenv_path=".env")

os.environ["HUGGINGFACEHUB_API_TOKEN"] = key

print(os.environ["HUGGINGFACEHUB_API_TOKEN"])
origins = [
    "*",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = HuggingFaceHub(
    repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1",
    task="text-generation",
    model_kwargs={
    # "token": key,
        "max_new_tokens": 512,
        "top_k": 30,
        "temperature": 0.3,
        "repetition_penalty": 1.03,
    },
)


def chat_with_bot(txt: str):
    print
    chat_model = ChatHuggingFace(llm=llm)
    user_template = PromptTemplate(template="{user_input}", input_variables=["user_input"])
    messages = [
        HumanMessage(content="..."),
        AIMessage(content="You're a helpful multilingual financial assistant. Users ask their queries, and you have to respond accurately and strictly in the same language."),
        HumanMessage(content=user_template.format(user_input=txt)),
    ]
    res = chat_model(messages).content
    return res


@app.post('/chat')
async def chat(text: str = Form(...)):
    try:
        res = chat_with_bot(text)
        res = str(res)
        last_inst_index = res.rfind("[/INST]")
        res = res[last_inst_index + len("[/INST]"):].strip()
        print(res)
        return res
    except Exception as e:
        return {"error": str(e)}
