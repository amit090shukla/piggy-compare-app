// --------------------------------------IMPORTS----------------------------------------
import * as React from "react";
import styled from "styled-components";
import Loader from "./assets/loader.gif";
//----------------------------------------------------------------------------------------

const COMPARE_FIELDS = [
  { heading: "NAME", key: "name" },
  { heading: "RATING", key: "rating" },
  { heading: "RISK", key: "riskometer" },
  { heading: "YOY RETURN", key: "minimum_subscription" },
  { heading: "MINIMUM BALANCE", key: "minimum_balance_maintainence" }
];

// ----------------------------------STATE & PROPS INTERFACE-------------------------------
interface CompareSectionProps {
  addedItems: any;
}

interface CompareSectionState {
  mfData: any;
  isLoading: boolean;
}
//-------------------------------------------------------------------------------------------

export default class CompareSection extends React.Component<
  CompareSectionProps,
  CompareSectionState
> {
  state: CompareSectionState = {
    mfData: [],
    isLoading: true
  };

  getMfData = () => {
    this.props.addedItems.map((val: any, key: any) =>
      fetch(`https://api.piggy.co.in/v1/mf/?key=${val.details_id}`)
        .then(data => data.json())
        .then(({ data }) =>
          this.setState({
            mfData: [...this.state.mfData, data.mutual_fund.details]
          })
        )
    );
  };

  async componentDidMount() {
    await this.getMfData();
    this.setState({ isLoading: false });
  }

  componentDidUpdate(
    prevProps: CompareSectionProps,
    prevState: CompareSectionState
  ) {
    if (prevProps.addedItems !== this.props.addedItems) {
      this.setState({ mfData: [] });
      this.getMfData();
    }
  }

  public render() {
    const { addedItems } = this.props;
    const { isLoading, mfData } = this.state;
    return (
      <StyledCompareWrapper>
        <h3 className="head">Compare Mutual Funds</h3>
        {isLoading ? (
          <img src={Loader} alt="Loader" />
        ) : (
          <StyledCompareCardWrapper className="d-f">
            {mfData.map((data: any, key: any) => (
              <StyledCompareCard key={key}>
                {COMPARE_FIELDS.map((val, key) => (
                  <div key={key}>
                    <p className="subhead">{val.heading}</p>
                    <h4 className="head">{data[val.key]}</h4>
                  </div>
                ))}
              </StyledCompareCard>
            ))}
          </StyledCompareCardWrapper>
        )}
      </StyledCompareWrapper>
    );
  }
}

// -------------------------------------STYLES-------------------------------------
const StyledCompareWrapper = styled.div`
  margin-top: 50px;
`;
const StyledCompareCardWrapper = styled.div`
  border: 1px solid #d2d2d2;
  padding: 10px;
  margin-right: 10px;
  margin: 0 auto;
`;
const StyledCompareCard = styled.div`
  border: 1px solid #d2d2d2;
  padding: 20px;
  margin-right: 20px;
  flex: 1;
`;
