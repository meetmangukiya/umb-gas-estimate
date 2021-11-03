import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/meetmangukiya/umb-gas-estimate" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="⛽ $UMB Gas Estimator"
        subTitle="Estimated gas costs for executing a smart contract tx in $UMB demonstrating usage of umbrella network oracles."
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
