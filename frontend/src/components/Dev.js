import styled from "styled-components";

const Dev = ({ rate, languages, picture, filterLanguage, nickname, bio }) => {
  const languageArray = languages.split(","); //array of dev languages

  const isShown = languageArray.map((language) =>
    filterLanguage.includes(language.replace(/\s/g, ""))
  );

  

  if (isShown.includes(true)) {
    return (
      <Wrapper>
        <Img1 src={picture} />
        <SmallWrapper11>

        <p>Dev Name: {nickname}</p>
        <p>About Me?! {bio}</p>
        </SmallWrapper11>
        <SmallWrapper2>

        <p>My Rate: {rate}</p>
        <p>My Languages: {languages}</p>
        </SmallWrapper2>
      </Wrapper>
    );
  }
  if (filterLanguage.length === 0) {
    return (
      <>
        <Body>
          <Wrapper2>
            <Img src={picture} />
            <SmallWrapper1>
              <p>Dev Name: {nickname}</p>
              <p>About me?! {bio}</p>
            </SmallWrapper1>

            <SmallWrapper2>

              <p>My Rate: {rate}</p>
              <p>My Languages: {languages}</p>
            </SmallWrapper2>
          </Wrapper2>
        </Body>
      </>
    );
  }
  return <Main></Main>;
};

const Body = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  background-color: #001d31;
  border: solid #ff86c9;
  border-radius: 10px;
  width: 100%;
  margin: 10px 10px 10px 10px;
  :hover {
    color: #00be67;
    cursor: pointer;
    border: solid #fff;
  }
`;
const Wrapper2 = styled.div`
  display: flex;
  background-color: #001d31;
  border: solid #ff86c9;
  border-radius: 10px;
  width: 100%;
  margin: 10px 10px 10px 10px;
  :hover {
    color: #00be67;
    cursor: pointer;
    border: solid #fff;
  }
`;
const SmallWrapper1 = styled.div`
  background-color: #001d31;
  border-radius: 10px;
  width: 49%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-family: ARIAL BLACK;
  font-size: 16px;
`;
const SmallWrapper11 = styled.div`
  background-color: #001d31;
  border-radius: 10px;
  width: 49%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-family: ARIAL BLACK;
  font-size: 16px;
`;
const SmallWrapper2 = styled.div`
  background-color: #001d31;
  flex-direction: column;
  font-family: ARIAL BLACK;
  border-radius: 10px;
  font-size: 16px;
  width: 28%;
  display: flex;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 15%;
  /* height: 20% ; */
  border-radius: 25%;
  padding: 20px 25px 20px 20px;
  justify-content: center;
  align-items: center;
`;
const Img1 = styled.img`
  width: 15%;
  /* height: 20% ; */
  border-radius: 25%;
  padding: 20px 25px 20px 20px;
  justify-content: center;
  align-items: center;
`;

export default Dev;
