import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

interface FutureProps {
  handlerFunction: () => Promise<any>;
  children: any;
}

interface FutureState {
  status: 0 | 1;
}

/**
 * @description Eğer async bir işlem yapılacaksa, bu işlem tamamlanana kadar boş bir ekran göstermek yerine "gri kutucuklu animasyonlar" göstermeye yarar.
 * @param handlerFunction Async Fonksiyon
 * @param children Async işlem tamamlanınca gösterilmesi gereken component.
 */
export default class Future extends React.Component<FutureProps, FutureState> {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  // Aşama 1: Component Render Edildiğinde
  async componentDidMount() {
    // Aşama 2: Async işlemi yapmaya başla.
    await this.props.handlerFunction();
    // Aşama 3: Durumu 1 (Hazır) haline getir.
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
