import React from "react";
import Layout from "./components/Layout";
import {Button} from "@material-ui/core";

export default function Napp() {
  return <Layout>
    <Button color={"primary"} variant={"contained"} fullWidth>Hello</Button>
  </Layout>;
}
