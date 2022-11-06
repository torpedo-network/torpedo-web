import filecoin from "../../assets/integrations/filecoin.png";
import xmtp from "../../assets/integrations/xmtp.png";
import quicknode from "../../assets/integrations/quicknode.png";
import vast from "../../assets/integrations/vast.png";
import aws from "../../assets/integrations/aws.png";
import gcp from "../../assets/integrations/gcp.png";
import midpoint from "../../assets/integrations/midpoint.png";

import IntegrationImage from "./IntegrationImage";

const Integrations = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto text-white">
        <div className="text-center mb-10">
          <h1 className="text-5xl mb-5">Integrations</h1>
          <p>Our product works with a web3-native stack.</p>
        </div>
        <div className="sm:grid-cols-3 grid-cols-2 grid md:gap-x-36 md:gap-y-20 gap-x-5 gap-y-5 md:w-1/2 mx-auto">
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={aws} alt="AWS logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={gcp} alt="GCP logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={vast} alt="Vast.ai logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={midpoint} alt="Midpoint logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IntegrationImage src={quicknode} alt="Quicknode logo" />
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
