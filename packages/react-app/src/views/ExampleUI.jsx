import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events, Contract } from "../components";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  userSigner,
  blockExplorer,
  contractConfig,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");

  return (
    <div>
      <div style={{ textAlign: "left", display: "inline-block", marginTop: "24px" }}>
        <h2>What is this?</h2>
        <p>
          You can use this dApp to get the cost of executing a transaction in $UMB. <br />
          Provide the contract address, the gas price to consider, and input data.
        </p>
        <h2>How does it work?</h2>
        <p>
          With the given contract address, the gas price, and input data: <br />
          <ol style={{ textAlign: "left", margin: "auto", display: "inline-block" }}>
            <li>The smart contract is executed, and the gas used by the execution is tracked.</li>
            <li>Current ETH/USD and UMB/USD price is retrieved using Umbrella network oracles.</li>
            <li>
              Current ETH and $UMB prices along with gas used, and gas price is used to <br />
              compute cost in $UMB.
            </li>{" "}
          </ol>
        </p>
      </div>
    </div>
  );
}
