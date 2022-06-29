import axios from "axios";

import React, { useEffect, useState } from "react";

export default function Write() {
  const [select, setSelect] = useState(true);
  const choice = () => {
    setSelect((current) => !current);
    console.log(select);
  };

  const [name, setName] = useState("");
  const [engName, setEngName] = useState("");
  const [thaiName, setThaiName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("");
  const [ing1, setIng1] = useState("");
  const [ing2, setIng2] = useState("");
  const [foodVar1, setFoodVar1] = useState("");
  const [foodVarDes1, setFoodVarDes1] = useState("");
  const [foodVar2, setFoodVar2] = useState("");
  const [foodVarDes2, setFoodVarDes2] = useState("");
  const [foodVar3, setFoodVar3] = useState("");
  const [foodVarDes3, setFoodVarDes3] = useState("");

  const [category, setCategory] = useState("");
  const [catDescription, setCatDescription] = useState("");

  const [arr] = [
    {
      name: name,
      engName: engName,
      thaiName: thaiName,
      description: description,
      method: method,
      ing1: ing1,
      ing2: ing2,
    },
  ];
  const onClick = () => {
    event.preventDefault();
    console.log(JSON.stringify(arr));
    console.log(arr);
  };

  const [catArr] = [
    {
      name: category,
      description: catDescription,
    },
  ];

  const create = async () => {
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
        },
      });
    } catch (error) {
      alert("error");
    }
  };

  const createCategory = async () => {
    alert(JSON.stringify(catArr));
    try {
      await axios.post("/api/categorywrite", {
        headers: { "Content-Type": "application/json" },
        data: {
          name: category,
          description: catDescription,
        },
      });
    } catch {
      alert("error");
    }
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
          <form name="food" onSubmit={create}>
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

              <option value="찜">찜</option>
              <option value="구이">구이</option>
              <option value="튀김">튀김</option>
              <option value="볶음">볶음</option>
              <option value="국물">국물</option>
            </select>

            <label htmlFor="ingredient_1">Ingredient_1 Category</label>
            <select
              onChange={(e) => setIng1(e.target.value)}
              name="ingredient_1"
              id="ingredient_1"
            >
              <option value="">선택</option>

              <option value="계란">계란</option>
              <option value="면">면</option>
              <option value="닭고기">닭고기</option>
              <option value="새우">새우</option>
            </select>

            <label htmlFor="ingredient_2">Ingredient_2 Category</label>
            <select
              onChange={(e) => setIng2(e.target.value)}
              name="ingredient_2"
              id="ingredient_2"
            >
              <option value="">선택</option>
              <option value="계란">계란</option>
              <option value="면">면</option>
              <option value="닭고기">닭고기</option>
              <option value="새우">새우</option>
            </select>

            <label htmlFor="description">Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              type="text"
              placeholder="description"
            />

            <label htmlFor="variation_name_1">Variation 1</label>
            <input
              onChange={(e) => setfoodVar1(e.target.value)}
              name="variation_name_1"
              placeholder="variation_name_1"
            />
            <input
              onChange={(e) => setFoodVarDes1(e.target.value)}
              name="variation_desc_1"
              placeholder="variation_description_1"
            />
            <label htmlFor="variation_name_2">Variation 2</label>
            <input
              onChange={(e) => setfoodVar2(e.target.value)}
              name="variation_name_2"
              placeholder="variation_name_2"
            />
            <input
              onChange={(e) => setFoodVarDes2(e.target.value)}
              name="variation_desc_2"
              placeholder="variation_description_2"
            />
            <label htmlFor="variation_name_3">Variation 3</label>
            <input
              onChange={(e) => setfoodVar3(e.target.value)}
              name="variation_name_3"
              placeholder="variation_name_3"
            />
            <input
              onChange={(e) => setFoodVarDes3(e.target.value)}
              name="variation_desc_3"
              placeholder="variation_description_3"
            />
            {/* <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange="loadFile(this)" /> */}
            <button onClick={onClick}>입력</button>

            <input type="submit" />
          </form>
        </div>
      ) : (
        <form name="category" onSubmit={createCategory}>
          <label htmlFor="catName">Category name</label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            required
            name="catName"
            type="text"
            placeholder="category name"
          />
          <label htmlFor="catName">Category Description</label>
          <input
            onChange={(e) => setCatDescription(e.target.value)}
            required
            name="catDescription"
            type="text"
            placeholder="category Description"
          />
          <input type="submit" />
        </form>
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
        `}
      </style>
    </div>
  );
}
