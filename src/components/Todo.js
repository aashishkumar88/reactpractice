import React, { useState } from "react";
import Button from "../components/Button";
import { BUTTON_TYPE } from "../components/Constant";

const Todo = () => {
  const [data, setData] = useState("");
  const [dataList, setDataList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList((prev) => {
      return [...prev, { id: Math.random(), name: data, isCompleted: false }];
    });
    setData("");
  };
  const handleCheck = (id) => {
    const updatedList = dataList.map((val) => {
      if (id === val.id) {
        return {
          ...val,
          isCompleted: !val.isCompleted,
        };
      } else return val;
    });
    setDataList(updatedList);
  };

  const deleteList = (id) => {
    const list = dataList
      .filter((val) => id !== val.id)
      .map((val) => {
        return val;
      });
    setDataList(list);
  };

  const buttonList = ({ type }) => {
    console.log(type, "type");
    if (type === "Complete") {
      const completeList = dataList.filter((val) => val.isCompleted);

      setFilterList(completeList);
    } else if (type === "Incomplete") {
      const incompleteList = dataList.filter((val) => !val.isCompleted);

      setFilterList(incompleteList);
    } else {
      let allList = dataList.map((val) => {
        return val;
      });
      setFilterList(allList);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              aria-label="Username"
              value={data}
              aria-describedby="addon-wrapping"
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-light my-3">
            Submit
          </button>
        </form>
        {filterList.length > 0
          ? filterList.map((item) => {
              return (
                <>
                  <div className="container todo d-flex justify-content-between">
                    <div className="form-check py-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={item.isCompleted}
                        onChange={() => handleCheck(item.id)}
                      />
                      <label
                        className="form-check-label d-flex "
                        key={item.toString()}
                      >
                        {item.name}
                      </label>
                    </div>
                    <div>
                      {item.isCompleted ? (
                        <div id="badge" className="float-end ">
                          <span className="badge bg-secondary d-flex justify-content-end mt-3">
                            Completed
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <i className="fas fa-edit mx-4"></i>
                      <i
                        className="fas fa-trash-alt mt-3"
                        onClick={() => deleteList(item.id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })
          : dataList.map((item) => {
              return (
                <>
                  <div className="container todo d-flex justify-content-between">
                    <div className="form-check py-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={item.isCompleted}
                        onChange={() => handleCheck(item.id)}
                      />
                      <label
                        className="form-check-label d-flex "
                        key={item.toString()}
                      >
                        {item.name}
                      </label>
                    </div>
                    <div>
                      {item.isCompleted ? (
                        <div id="badge" className="float-end ">
                          <span className="badge bg-secondary d-flex justify-content-end mt-3">
                            Completed
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <i className="fas fa-edit mx-4"></i>
                      <i
                        className="fas fa-trash-alt mt-3"
                        onClick={() => deleteList(item.id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}
        {BUTTON_TYPE.map((value) => {
          return <Button title={value.title} buttonList={buttonList} />;
        })}
      </div>
    </>
  );
};

export default Todo;
