import styled from "styled-components";

const Dev = ({ rate, languages, picture, filterLanguage }) => {
  const languageArray = languages.split(","); //array of dev languages

  const isShown = languageArray.map((language) =>
    filterLanguage.includes(language.replace(/\s/g, ""))
  );

  // isShown = [true, false, true, false, false]

  if (isShown.includes(true)) {
    return (
      <Wrapper>
        <p>{rate}</p>
        <p>{languages}</p>
        {/* <img src={picture} /> */}
      </Wrapper>
    );
  }
  if (filterLanguage.length === 0) {
    return (
      <Wrapper>
        <p>{rate}</p>
        <p>{languages}</p>
        {/* <img src={picture} /> */}
      </Wrapper>
    );
  }
  return <Main></Main>;
};

const Main = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const Wrapper = styled.div`
flex-direction: column-reverse;
background-color: grey;
border-radius: 10px;

`;




export default Dev;
