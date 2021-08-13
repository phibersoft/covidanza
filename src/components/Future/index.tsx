import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

interface FutureProps {
  handlerFunction: () => Promise<any>;
  children: any;
}

interface FutureState {
  status: 0 | 1;
}

export default class Future extends React.Component<FutureProps, FutureState> {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  async componentDidMount() {
    await this.props.handlerFunction();
    this.setState({
      status: 1,
    });
  }

  render() {
    const { status } = this.state;
    const { children } = this.props;
    // Loading
    if (status === 0) {
      return (
        <div className={"wrapper"}>
          <Skeleton variant={"rect"} width={"90%"} height={"120vh"} />
        </div>
      );
    } else {
      return children;
    }
  }
}
