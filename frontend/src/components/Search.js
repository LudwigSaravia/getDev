import { useContext, useState } from "react";
import Dev from "./Dev";
import { DevContext } from "./DevContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Search = () => {
  const { devs } = useContext(DevContext);
  const [language, setLanguage] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  const navigate = useNavigate();
  const languageHandler = (e) => {
    if (e.target.checked) {
      setLanguage([...language, e.target.value]);
    } else {
      const arr = language.filter((item) => item !== e.target.value);
      setLanguage(arr);
    }
  };

  const allLanguages = []; //[["java", " python"]]
  devs.forEach((dev) => {
    allLanguages.push(dev.languages.split(",")); // ["java", " python"]
  });

  console.log("allLanguages", allLanguages);

  // falt ["java", " python"]

  const uniqueLanguages = [...new Set(allLanguages.flat())];
  console.log("uniqueLanguages", uniqueLanguages);

  return (
    <Wrapper>
      <div>
        {!isAuthenticated && <p>To book a session please login!</p>}

        {uniqueLanguages.map((filter) => {
          return (
            <>
              <label>{filter.replace(/\s/g, "")}</label>
              <input
                type="checkbox"
                value={filter.replace(/\s/g, "")}
                onChange={languageHandler}
              />
            </>
          );
        })}
      </div>

      {devs.map((dev) => {
        return (
          <div
            onClick={() => {
              {
                isAuthenticated && navigate(`/dev/${dev._id}`);
              }
            }}
          >
            <Dev
              rate={dev.rate}
              languages={dev.languages}
              picture={dev.picture}
              filterLanguage={language}
            />
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-direction: column-reverse;
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 700px;
  margin-left: 250px;
`;
export default Search;
