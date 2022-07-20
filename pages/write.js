import axios from "axios";
import { PrismaClient } from "@prisma/client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";



const prisma = new PrismaClient();

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Write({ method, ing }) {

  const { data: session, status } = useSession();
  const router = useRouter();


  const [name, setName] = useState("");
  const [engName, setEngName] = useState("");
  const [thaiName, setThaiName] = useState("");
  const [description, setDescription] = useState("");
  const [cookMethod, setCookMethod] = useState("");
  const [ing1, setIng1] = useState("");
  const [ing2, setIng2] = useState("");
  const [imageSrc1, setImageSrc1] = useState();
  const [uploadData, setUploadData] = useState();

  const [arr] = [
    {
      name: name,
      engName: engName,
      thaiName: thaiName,
      description: description,
      method: cookMethod,
      ing1: ing1,
      ing2: ing2,
      img1: imageSrc1,
    },
  ];



  // 데이터 입력하기 전에 확인
  const onClick = () => {
    event.preventDefault();
    console.log(arr);
  };

  const deshandle = (e) => {
    setDescription(e);
  };
  //일단은 음식에 이미지 붙이는 기능

  function cancelImage() {
    setImageSrc1(null);
    setUploadData(null);
  }

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc1(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader);
    }
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    //파일이 들어간 것들을 배열화시켜서 fileInput에 저장하는 듯 싶다
    console.log(event.currentTarget);
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
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

    setImageSrc1(data.secure_url);
    setUploadData(data);
  };

  // 데이터베이스에 axios를 통해 '음식'을 저장하는 메소드
  const createFood = async () => {
    alert(JSON.stringify(arr));
    try {
    await axios.post("/api/food-write", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: name,
          engName: engName,
          thaiName: thaiName,
          description: description,
          method: cookMethod,
          ing1: ing1,
          ing2: ing2,
          img: imageSrc1,
        },
      });
    } catch (error) {
      alert("error");
    }
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

        <div name="foodwirte">
        <h1>음식 작성</h1>

          <form id="foodform" name="food" onSubmit={createFood}>
            <label htmlFor="foodName">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              name="foodName"
              type="text"
              placeholder="food name"
            />

            <label htmlFor="engName">English Name</label>
            <input
              onChange={(e) => setEngName(e.target.value)}
              name="engName"
              type="text"
              placeholder="food name by English"
            />

            <label htmlFor="thaiName">Thai Name</label>
            <input
              onChange={(e) => setThaiName(e.target.value)}
              name="thaiName"
              type="text"
              placeholder="food name by Thai"
            />

            <label htmlFor="method">Method Category</label>
            <select
              onChange={(e) => setCookMethod(e.target.value)}
              name="method"
              id="method"
            >
              <option value="">선택</option>
              {method.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>

            <label htmlFor="ingredient_1">Ingredient_1 Category</label>
            <select
              onChange={(e) => setIng1(e.target.value)}
              name="ingredient_1"
              id="ingredient_1"
            >
              <option value="">선택</option>
              {ing.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>

            <label htmlFor="ingredient_2">Ingredient_2 Category</label>
            <select
              onChange={(e) => setIng2(e.target.value)}
              name="ingredient_2"
              id="ingredient_2"
            >
              <option value="">선택</option>
              {ing.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>

            {/*           <label htmlFor="description">Description</label>
            <input
              className="description"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="textarea"
              placeholder="description"
            /> */}
          </form>
          <div className="editor" >
          <h3>본문</h3>
          <QuillWrapper
            onChange={deshandle}/>
            </div>
          <form
            method="post"
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
          >
            <input type="file" name="file" />
            {imageSrc1 ? (
              <Image width={500} height={500} alt="" src={imageSrc1} />
            ) : null}
            {imageSrc1 && !uploadData && (
              <p>
                <button>Upload Files</button>
                <button onClick={cancelImage}>Cancel</button>
              </p>
            )}
          </form>

            <button type="submit" form="foodform">
              음식 저장하기
            </button>

          <button onClick={onClick}>json 출력</button>
        </div>
      
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

          .editor {
            height:250px;
          }
          .ql-container ql-snow{
           height:100%;
          }

       
        `}
      </style>
    </div>
  );
}

export const getServerSideProps = async () => {
  const method = await prisma.method.findMany({

    select: {
      name: true,
      id: true,
    },
  });
  const ing = await prisma.ingredient.findMany({

    select: {
      name: true,
      id: true,
    },
  });

  return {
    props: { method, ing },
  };
};
