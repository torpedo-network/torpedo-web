import umaLogo from "../../assets/integrations/uma.png";
import filecoin from "../../assets/integrations/filecoin.png";
import xmtp from "../../assets/integrations/xmtp.png";
import Image from "next/image";
import IntegrationImage from "./IntegrationImage";

const Integrations = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto text-white">
        <div className="text-center mb-10">
          <h1 className="text-5xl mb-5">Integrations</h1>
          <p>Our product works with a web3-native stack.</p>
        </div>
        <div className="md:grid-cols-3 md:grid gap-20">
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={umaLogo} alt="Uma logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={filecoin} alt="Filecoin logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={xmtp} alt="XMTP logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
