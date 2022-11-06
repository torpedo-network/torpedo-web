import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  TorpedoFactory,
  TorpedoFactoryMethodNames,
  TorpedoFactoryEventsContext,
  TorpedoFactoryEvents
>;
export type TorpedoFactoryEvents = undefined;
export interface TorpedoFactoryEventsContext {}
export type TorpedoFactoryMethodNames =
  | 'new'
  | 'EthToUSD'
  | 'USDToWei'
  | 'addressToPhaestus'
  | 'calculateUSDCost'
  | 'calculateWeiCost'
  | 'createSession'
  | 'deductResources'
  | 'extendSession'
  | 'getClientSessionAddress'
  | 'getNow'
  | 'getPoolCapacity'
  | 'getRatePrecision'
  | 'owner'
  | 'phaestusNodes'
  | 'priceFeed'
  | 'registerPhaestus'
  | 'releaseResources'
  | 'viewPhaestus';
export interface AddressToPhaestusResponse {
  phaestusAddress: string;
  numCPUs: string;
  numGPUs: string;
  endTime: string;
  rate: string;
  gpuType: string;
}
export interface CalculateUSDCostRequest {
  numCPUs: string | number;
  numGPUs: string | number;
  totalTime: string | number;
  gpuType: string | number;
}
export interface CalculateWeiCostRequest {
  numCPUs: string | number;
  numGPUs: string | number;
  totalTime: string | number;
  gpuType: string | number;
}
export interface CreateSessionRequest {
  numCPUs: string | number;
  numGPUs: string | number;
  totalTime: string | number;
  gpuType: string | number;
}
export interface GetPoolCapacityResponse {
  result0: string;
  result1: string;
  result2: string;
}
export interface PhaestusNodesResponse {
  phaestusAddress: string;
  numCPUs: string;
  numGPUs: string;
  endTime: string;
  rate: string;
  gpuType: string;
}
export interface PhaestusResponse {
  phaestusAddress: string;
  numCPUs: string;
  numGPUs: string;
  endTime: string;
  rate: string;
  gpuType: string;
}
export interface TorpedoFactory {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _priceFeed Type: address, Indexed: false
   */
  'new'(_priceFeed: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ethAmount Type: uint256, Indexed: false
   */
  EthToUSD(ethAmount: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param USD Type: uint256, Indexed: false
   */
  USDToWei(USD: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  addressToPhaestus(
    parameter0: string
  ): MethodConstantReturnContext<AddressToPhaestusResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param sessionRequest Type: tuple, Indexed: false
   */
  calculateUSDCost(
    sessionRequest: CalculateUSDCostRequest
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param sessionRequest Type: tuple, Indexed: false
   */
  calculateWeiCost(
    sessionRequest: CalculateWeiCostRequest
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param sessionRequest Type: tuple, Indexed: false
   */
  createSession(
    sessionRequest: CreateSessionRequest
  ): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  deductResources(): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param addedTime Type: uint256, Indexed: false
   */
  extendSession(addedTime: string): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getClientSessionAddress(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getNow(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPoolCapacity(): MethodConstantReturnContext<GetPoolCapacityResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getRatePrecision(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  phaestusNodes(
    parameter0: string
  ): MethodConstantReturnContext<PhaestusNodesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  priceFeed(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param numCPUs Type: uint8, Indexed: false
   * @param numGPUs Type: uint8, Indexed: false
   * @param endTime Type: uint256, Indexed: false
   * @param rate Type: uint256, Indexed: false
   * @param _gpuType Type: uint8, Indexed: false
   */
  registerPhaestus(
    numCPUs: string | number,
    numGPUs: string | number,
    endTime: string,
    rate: string,
    _gpuType: string | number
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  releaseResources(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  viewPhaestus(index: string): MethodConstantReturnContext<PhaestusResponse>;
}
