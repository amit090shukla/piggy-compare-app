// --------------------------------------IMPORTS----------------------------------------
import * as React from "react";
import styled from "styled-components";
//----------------------------------------------------------------------------------------

// ----------------------------------STATE & PROPS INTERFACE-------------------------------
interface SearchResultsProps {
  fundDetails: any;
  isAlreadyAdded: (details_id: string) => boolean;
  addToList: (val: any) => any;
  removeFromList: (details_id: string) => any;
}
//------------------------------------------------------------------------------------------

const SearchResults = (props: SearchResultsProps) => {
  const { name, details_id } = props.fundDetails;

  const shouldAddItem = () => {
    const isAdded = props.isAlreadyAdded(details_id);
    if (!isAdded) {
      props.addToList(props.fundDetails);
    } else {
      props.removeFromList(details_id);
    }
  };

  return (
    <StyledResultContainer>
      <p className="subhead">NAME</p>
      <h4 className="head">{name}</h4>
      <button onClick={shouldAddItem} className="btn-secondary">
        {props.isAlreadyAdded(details_id) ? "REMOVE" : "ADD"}
      </button>
    </StyledResultContainer>
  );
};

export default SearchResults;

// -------------------------------------STYLES-------------------------------------

const StyledResultContainer = styled.div`
  border: 1px solid #d2d2d2;
  padding: 10px 20px;
  margin-right: 10px;
`;
