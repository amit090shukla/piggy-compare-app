// --------------------------------------IMPORTS----------------------------------------
import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Header";
import empty from "./assets/empty.svg";
import SearchResults from "./SearchResults";
import { FaTimes } from "react-icons/fa";
import CompareSection from "./CompareSection";
//----------------------------------------------------------------------------------------

// ----------------------------------STATE & PROPS INTERFACE-------------------------------
interface State {
  query: string;
  addedItems: any[];
  searchResults: any[];
  isLoading: boolean;
}

interface Props {}
//------------------------------------APP CLASS COMPONENT-----------------------------------------------

class App extends Component<Props, State> {
  state: State = {
    query: "",
    addedItems: [],
    searchResults: [],
    isLoading: false
  };

  queryChange = (e: any): void => {
    this.setState({
      query: e.target.value
    });
  };

  searchFunds = async (e: any) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const rawResponse = await fetch("https://api.piggy.co.in/v2/mf/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        search: this.state.query,
        rows: 3,
        offset: 1
      })
    });

    const content = await rawResponse.json();
    this.setState({
      ...this.state,
      searchResults: content.data.search_results,
      isLoading: false
    });
  };

  isAlreadyAdded = (detail_id: string): boolean => {
    const { addedItems } = this.state;
    for (let item of addedItems) {
      if (item.details_id === detail_id) {
        return true;
      }
    }
    return false;
  };

  addToList = (mutualFund: any) => {
    this.setState({
      addedItems: [...this.state.addedItems, mutualFund]
    });
  };

  removeFromList = (details_id: string) => {
    // Find the index of added item in the array
    const { addedItems } = this.state;
    let pos = -1;
    for (let item in addedItems) {
      if (addedItems[item].details_id === details_id) {
        pos = parseInt(item);
        break;
      }
    }
    if (pos > -1) {
      let addedItems = this.state.addedItems.filter(
        (item, index) => index != pos
      );
      this.setState({ addedItems });
    }
  };

  handleSearchOnEnter = (e: any) => {
    if (e.key == "Enter") {
      this.searchFunds(e);
    }
  };
  public render() {
    const { query, addedItems, searchResults, isLoading } = this.state;
    return (
      <StyledContainer>
        <Header />
        <StyledSearchContainer className="d-f space-between">
          <div>
            <h1 className="m-t-20">Compare Mutual Funds</h1>
            <p className="m-t-5">
              Search & Compare multiple mutual funds so you can take the best
              decision.
            </p>
            <div className="m-t-20 d-f">
              <StyledSearchField
                type="text"
                value={query}
                placeholder="Enter to search"
                onChange={e => this.queryChange(e)}
                onKeyPress={e => this.handleSearchOnEnter(e)}
              />
              <StyledSearchButton
                type="button"
                value="Search"
                className="c-p"
                onClick={this.searchFunds}
              />
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : searchResults.length ? (
              <div>
                <p className="subhead m-t-20">{searchResults.length} Results</p>
                <StyledSearchResult className="d-f-c m-t-20">
                  {searchResults.map((val, key) => (
                    <SearchResults
                      key={key}
                      fundDetails={val}
                      isAlreadyAdded={this.isAlreadyAdded}
                      addToList={this.addToList}
                      removeFromList={this.removeFromList}
                    />
                  ))}
                </StyledSearchResult>
              </div>
            ) : null}
          </div>
          <StyledItemContainer>
            {addedItems.length ? (
              <div className="d-f-c space-between">
                <div>
                  <h3>Added Items</h3>
                  {addedItems.map((addedItem, key) => {
                    return (
                      <div
                        key={key}
                        style={{
                          padding: "10px 0",
                          borderBottom: "1px solid #d2d2d2"
                        }}
                      >
                        <div
                          className="d-f space-between"
                          style={{
                            alignItems: "center"
                          }}
                        >
                          <p className="m-r-5">{addedItem.name}</p>
                          <FaTimes
                            className="c-p"
                            onClick={() =>
                              this.removeFromList(addedItem.details_id)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <img src={empty} />
                <h4 className="t-a-c">No item added</h4>
                <p className="t-a-c">Search and add items to compare</p>
              </>
            )}
          </StyledItemContainer>
        </StyledSearchContainer>
        {this.state.addedItems.length ? (
          <CompareSection addedItems={addedItems} />
        ) : null}
      </StyledContainer>
    );
  }
}

export default App;

// -------------------------------------STYLES-------------------------------------
const StyledContainer = styled.div``;
const StyledSearchContainer = styled.div`
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const StyledItemContainer = styled.div`
  box-shadow: 0 3px 3px #d2d2d2;
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const StyledSearchButton = styled.input`
  background-color: #9c3c94;
  border: none;
  color: #fff;
  padding: 10px 20px;
`;
const StyledSearchField = styled.input`
  border: none;
  padding: 10px 20px;
  border: 1px solid #d2d2d2;
  margin-right: 10px;
  width: 70%;
`;

const StyledSearchResult = styled.div`
  height: 450px;
  overflow-y: scroll;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 400px;
  }
`;
