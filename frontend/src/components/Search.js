import { useContext, useState } from "react";
import Dev from "./Dev";
import { DevContext } from "./DevContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogInAsUser from "./LogInAsUser";

const Search = () => {
  document.body.style.backgroundColor = "#001d31";

  const { devs, loggedUser } = useContext(DevContext);
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
    <Body>

    <Wrapper>
      <div>
        <Header>
        <Div1>

        {!isAuthenticated && <p>To book a session please login!</p>}
        </Div1>

        {uniqueLanguages.map((filter) => {
          return (
            <>
<Div2>
              <label>{filter.replace(/\s/g, "")}</label>
              <input
                type="checkbox"
                value={filter.replace(/\s/g, "")}
                onChange={languageHandler}
                />
                </Div2>
            </>
          );
        })}
        </Header>
      </div>

      {devs.map((dev) => {
        console.log(dev)
        return (
          <div
          onClick={() => {
            {loggedUser && loggedUser.role == "developer" ? navigate ("/loginasuser") : isAuthenticated && navigate(`/dev/${dev._id}`);}

            
            }}
            >
            <Dev
              bio={dev.bio}
              rate={dev.rate}
              languages={dev.languages}
              nickname={dev.nickname}
              picture={dev.picture}
              filterLanguage={language}
              />
          </div>
        );
      })}
    </Wrapper>
</Body>
  );
};

const Wrapper = styled.div`
  background-color: #001d31;
  color: white;
  border-radius: 10px;
  width: 600px;
`;
const Body = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #001d31;

`;
const Header = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
background-color: #001d31;

`;
const Div1 = styled.div`
display: flex;
flex-direction: column;
background-color: #001d31;
width: 100%;
align-items: center;
color:#00be67;
font-family:ARIAL BLACK;
`;
const Div2 = styled.div`
display: flex;
background-color: #001d31;
width: fit-content;
margin: 5px;
justify-content: center;
font-size: 12px;
color: #00be67;
font-family:ARIAL BLACK;
/* border: solid white; */
border-radius: 10%;

`;
const Test = styled.div`
background-color: red;

`;
export default Search;
