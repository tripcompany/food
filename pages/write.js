import axios from "axios";
import { PrismaClient } from "@prisma/client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import TextEditor from "../components/text-editor";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const prisma = new PrismaClient();

export default function Write({ catMethod, catIng }) {
  const [select, setSelect] = useState(true);
  const choice = () => {
    setSelect((current) => !current);
    console.log(select);
  };
  const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })

  const [name, setName] = useState("");
  const [engName, setEngName] = useState("");
  const [thaiName, setThaiName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("");
  const [ing1, setIng1] = useState("");
  const [ing2, setIng2] = useState("");

  const [category, setCategory] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catType, setCatType] = useState("");

  const [imageSrc1, setImageSrc1] = useState();
  const [uploadData, setUploadData] = useState();

  const [imageCatSrc1, setImageCatSrc1] = useState();
  const [uploadCatData, setUploadCatData] = useState();

  const [arr] = [
    {
      name: name,
      engName: engName,
      thaiName: thaiName,
      description: description,
      method: method,
      ing1: ing1,
      ing2: ing2,
      img1: imageSrc1,
    },
  ];

  const [catArr] = [
    {
      name: category,
      description: catDescription,
      type: catType,
      img1: imageCatSrc1,
    },
  ];

  // 데이터 입력하기 전에 확인
  const onClick = () => {
    event.preventDefault();
    setCatDescription(document.getElementsByClassName("ql-editor")[0].innerHTML);
    console.log(catDescription);
    // console.log(arr);
  };

/*   const QuillWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });

  const QuillRef = useRef(null);
  const handleChaneg = (e) => {
    setCatDescription(e);
    console.log(catDescription);
  };
 */
  // 데이터베이스에 axios를 통해 '음식'을 저장하는 메소드
  const createFood = async () => {
    alert(JSON.stringify(arr));
    try {
      await axios.post("/api/foodwrite", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: name,
          engName: engName,
          thaiName: thaiName,
          descripcion: description,
          method: method,
          ing1: ing1,
          ing2: ing2,
          img1: imageSrc1,
        },
      });
    } catch (error) {
      alert("error");
    }
  };
  // 데이터베이스에 axios를 통해 '카테고리'를 저장하는 메소드

  const createCategory = async () => {
    alert(JSON.stringify(catArr));
    try {
      await axios.post("/api/categorywrite", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: category,
          description: catDescription,
          type: catType,
          img1: imageCatSrc1,
        },
      });
    } catch {
      alert("error");
    }
  };

  //일단은 음식에 이미지 붙이는 기능

  function cancelImage() {
    setImageSrc1(null);
    setUploadData(null);
    setImageCatSrc1(null);
    setUploadCatData(null);
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

  const handleOnChangeCat = (changeEvent) => {
    const readerCat = new FileReader();

    readerCat.onload = function (onLoadEvent) {
      setImageCatSrc1(onLoadEvent.target.result);
      setUploadCatData(undefined);
    };
    if (event.target.files[0]) {
      readerCat.readAsDataURL(event.target.files[0]);
    }
  };
  const handleOnSubmitCat = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    //파일이 들어간 것들을 배열화시켜서 fileInput에 저장하는 듯 싶다
    console.log(event.currentTarget);
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "filecat"
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

    setImageCatSrc1(data.secure_url);
    setUploadCatData(data);
  };

  //로그인 상태 체크해서 안되어있으면 접근 금지 표시하기
  return (
    <div>
      <h3>Select</h3>
      <div>
        <div>
          <label htmlFor="select"></label>
          <div>
            <input
              defaultChecked
              onClick={choice}
              type="radio"
              name="select"
              value="food"
            />
            Food
          </div>
          <div>
            <input
              onClick={choice}
              type="radio"
              name="select"
              value="Category"
            />
            Category
          </div>
        </div>
      </div>

      {select ? (
        <div name="foodwirte">
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
              onChange={(e) => setMethod(e.target.value)}
              name="method"
              id="method"
            >
              <option value="">선택</option>
              {catMethod.map((m) => (
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
              {catIng.map((i) => (
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
              {catIng.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>

            <label htmlFor="description">Description</label>
            <input
              className="description"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="textarea"
              placeholder="description"
            />
          </form>
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

          <div>
            <button type="submit" form="foodform">
              음식 저장하기
            </button>
          </div>

          <button onClick={onClick}>json 출력</button>
        </div>
      ) : (
        <div>
          <form name="category" id="catform" onSubmit={createCategory}>
            <label htmlFor="catName">Category name</label>
            <input
              onChange={(e) => setCategory(e.target.value)}
              required
              name="catName"
              type="text"
              placeholder="category name"
            />
            {/*             <label htmlFor="catName">Category Description</label>
            <textarea
              className="description"
              onChange={(e) => setCatDescription(e.target.value)}
              name="catDescription"
              type="textarea"
              placeholder="category Description"
            /> */}

            <label htmlFor="type">Category Type</label>

            <select onChange={(e) => setCatType(e.target.value)} htmlFor="type">
              <option value="">선택</option>
              <option value="조리법">조리법</option>
              <option value="재료">재료</option>
            </select>
          </form>
          <QuillWrapper 
          className="editor"/>

          <form
            method="post"
            onChange={handleOnChangeCat}
            onSubmit={handleOnSubmitCat}
          >
            <input type="file" name="filecat" />

            {imageCatSrc1 ? (
              <Image width={500} height={500} alt="" src={imageCatSrc1} />
            ) : null}
            {imageCatSrc1 && !uploadCatData && (
              <p>
                <button>Upload Files</button>
                <button onClick={cancelImage}>Cancel</button>
              </p>
            )}
          </form>

          <div>
            <button type="submit" form="catform">
              카테고리 저장하기
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

export const getServerSideProps = async () => {
  const catMethod = await prisma.category.findMany({
    where: {
      type: "조리법",
    },
    select: {
      name: true,
      id: true,
    },
  });
  const catIng = await prisma.category.findMany({
    where: {
      type: "재료",
    },
    select: {
      name: true,
      id: true,
    },
  });

  return {
    props: { catMethod, catIng },
  };
};
