import axios from "axios";
import { PrismaClient } from "@prisma/client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import TextEditor from "../components/text-editor";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";



const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Write() {
  const [select, setSelect] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  const choice = () => {
    setSelect((current) => !current);
    console.log(select);
  };

  const [methodName, setMethodName] = useState("");
  const [methodThaiName, setMethodThaiName] = useState("");
  const [metDescription, setMetDescription] = useState("");

  const [ingName, setIngName] = useState("");
  const [ingThaiName, setIngThaiName] = useState("");
  const [ingDescription, setIngDescription] = useState("");

  const [methodImg, setmethodImg] = useState();
  const [uploadDataMethod, setUploadDataMethod] = useState();

  const [ingImg, setIngImg] = useState();
  const [uploadDataIng, setUploadDataIng] = useState();

  const [methodArr] = [
    {
      name: methodName,
      thaiName: methodThaiName,
      description: metDescription,
      img: methodImg,
    },
  ];
  const [ingArr] = [
    {
      name: ingName,
      thaiName: ingThaiName,
      description: ingDescription,
      img: ingImg,
    },
  ];

  // 데이터 입력하기 전에 확인
  const onClick = () => {
    event.preventDefault();
    console.log(methodArr);
    console.log(ingArr);
  };

  const changeQuilMet = (e) => {
    setMetDescription(e);
  };
  const changeQuilIng = (e) => {
    setIngDescription(e);
  };

  // 데이터베이스에 axios를 통해 '메소드'을 저장하는 메소드
  const createMethod = async () => {
    alert(JSON.stringify(methodArr));
    try {
      await axios.post("/api/method-write", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: methodName,
          thaiName: methodThaiName,
          description: metDescription,
          img: methodImg,
        },
      });
    } catch (error) {
      alert("error");
    }
  };
  // 데이터베이스에 axios를 통해 '재료'를 저장하는 메소드
  const createIng = async () => {
    alert(JSON.stringify(ingArr));
    try {
      await axios.post("/api/ing-write", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: ingName,
          thaiName: ingThaiName,
          description: ingDescription,
          img: ingImg,
        },
      });
    } catch (error) {
      alert("error");
    }
  };


  //일단은 음식에 이미지 붙이는 기능

  function cancelImage() {
    null;
  }

  const handleOnChangeMet = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setmethodImg(onLoadEvent.target.result);
      setUploadDataMethod(undefined);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader);
    }
  };
  const handleOnSubmitMet = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    //파일이 들어간 것들을 배열화시켜서 fileInput에 저장하는 듯 싶다
    console.log(event.currentTarget);
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file-method"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "basic-upload");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dqplzfo9a/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setmethodImg(data.secure_url);
    setUploadDataMethod(data);
  };

  const handleOnChangeIng = (changeEvent) => {
    const readerCat = new FileReader();

    readerCat.onload = function (onLoadEvent) {
      setIngImg(onLoadEvent.target.result);
      setUploadDataIng(undefined);
    };
    if (event.target.files[0]) {
      readerCat.readAsDataURL(event.target.files[0]);
    }
  };
  const handleOnSubmitIng = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    //파일이 들어간 것들을 배열화시켜서 fileInput에 저장하는 듯 싶다
    console.log(event.currentTarget);
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file-ing"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "basic-upload");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dqplzfo9a/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setIngImg(data.secure_url);
    setUploadDataIng(data);
  };
  if (status === "unauthenticated") {
    router.replace("/admin");
    return (
      <div>
        <h1>Can not access</h1>
        <div>You must log in</div>
      </div>
    );
  }
  //로그인 상태 체크해서 안되어있으면 접근 금지 표시하기
  return (
    <div>
      <div>
        <h3>Select</h3>

        <label htmlFor="select"></label>
        <span>
          <input
            defaultChecked
            onClick={choice}
            type="radio"
            name="select"
            value="method"
          />
          Method
        </span>
        <span>
          <input
            onClick={choice}
            type="radio"
            name="select"
            value="ingridient"
          />
          Ingridient
        </span>
      </div>

      {select ? (
        <div>
          <form name="method" id="methodform" onSubmit={createMethod}>
            <label htmlFor="name">Method name</label>
            <input
              onChange={(e) => setMethodName(e.target.value)}
              required
              name="name"
              type="text"
              placeholder="method name"
            />
            <label htmlFor="Thainame">Thai name</label>
            <input
              onChange={(e) => setMethodThaiName(e.target.value)}
              required
              name="ThaiName"
              type="text"
              placeholder="method Thai name"
            />
            {/*             <label htmlFor="catName">Category Description</label>
          <textarea
            className="description"
            onChange={(e) => setCatDescription(e.target.value)}
            name="catDescription"
            type="textarea"
            placeholder="category Description"
          /> */}
          </form>
          <QuillWrapper onChange={changeQuilMet} className="editor" />
          <form
            method="post"
            onChange={handleOnChangeMet}
            onSubmit={handleOnSubmitMet}
          >
            <input type="file" name="file-method" />

            {methodImg ? (
              <Image width={500} height={500} alt="" src={methodImg} />
            ) : null}
            {methodImg && !uploadDataMethod && (
              <p>
                <button>Upload Files</button>
                <button onClick={cancelImage}>Cancel</button>
              </p>
            )}
          </form>

          <div>
            <button type="submit" form="methodform">
              조리법 저장하기
            </button>
          </div>
          <button onClick={onClick}>json 출력</button>
        </div>
      ) : (
        <div>
          <form name="ingridient" id="ingform" onSubmit={createIng}>
            <label htmlFor="name">Ingridient name</label>
            <input
              onChange={(e) => setIngName(e.target.value)}
              required
              name="name"
              type="text"
              placeholder="ingregient name"
            />
            <label htmlFor="ingThaiName">Thai name</label>
            <input
              onChange={(e) => setIngThaiName(e.target.value)}
              required
              name="ingThaiName"
              type="text"
              placeholder="ingregient Thai name"
            />
            {/*             <label htmlFor="catName">Category Description</label>
            <textarea
              className="description"
              onChange={(e) => setCatDescription(e.target.value)}
              name="catDescription"
              type="textarea"
              placeholder="category Description"
            /> */}
          </form>
          <QuillWrapper onChange={changeQuilIng} className="editor" />
          <form
            method="post"
            onChange={handleOnChangeIng}
            onSubmit={handleOnSubmitIng}
          >
            <input type="file" name="file-ing" />

            {ingImg ? (
              <Image width={500} height={500} alt="" src={ingImg} />
            ) : null}
            {ingImg && !uploadDataIng && (
              <p>
                <button>Upload Files</button>
                <button onClick={cancelImage}>Cancel</button>
              </p>
            )}
          </form>

          <div>
            <button type="submit" form="ingform">
              재료 저장하기
            </button>
          </div>
          <button onClick={onClick}>json 출력</button>
        </div>
      )}

      <style jsx>
        {`
          form * {
            display: block;
            margin: 10px;
          }
          div {
            position: relative;
            margin: 20px;
          }
          form {
            position: relative;
          }
          photo# {
            height: 100em;
          }
          .description {
            width: 30em;
            height: 20em;
            white-space: normal;
          }
        `}
      </style>
    </div>
  );
}
