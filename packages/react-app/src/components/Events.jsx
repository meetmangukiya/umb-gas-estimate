import { useEventListener } from "eth-hooks/events/useEventListener";
import { List } from "antd";
import { Address } from "../components";
import { utils } from "ethers";

/*
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
*/

export default function Events({ contracts, contractName, eventName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>Events:</h2>
      <List
        style={{
          textAlign: "left",
        }}
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber + "_" + item.args.sender + "_" + item.args.purpose}>
              From: <Address address={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              <br />
              To(Contract): <Address address={item.args[1]} ensProvider={mainnetProvider} fontSize={16} />
              <br />
              <p>Gas used in UMB: {utils.formatEther(item.args?.[3])} $UMB</p>
              <p>Gas used: {item.args?.[4]?.toString()}</p>
              <p>Gas price in Ether: {utils.formatUnits(item.args?.[5], "gwei")} gwei</p>
              <p>Ether price in USD: $ {utils.formatEther(item.args?.[6])}</p>
              <p>UMB price in USD: $ {utils.formatUnits(item.args?.[7], "gwei")}</p>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
