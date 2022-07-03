/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "thenalab.tsc.tsc";

export interface MsgCreateNFT {
  creator: string;
}

export interface MsgCreateNFTResponse {}

const baseMsgCreateNFT: object = { creator: "" };

export const MsgCreateNFT = {
  encode(message: MsgCreateNFT, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateNFT } as MsgCreateNFT;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateNFT {
    const message = { ...baseMsgCreateNFT } as MsgCreateNFT;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: MsgCreateNFT): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateNFT>): MsgCreateNFT {
    const message = { ...baseMsgCreateNFT } as MsgCreateNFT;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    return message;
  },
};

const baseMsgCreateNFTResponse: object = {};

export const MsgCreateNFTResponse = {
  encode(_: MsgCreateNFTResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateNFTResponse } as MsgCreateNFTResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateNFTResponse {
    const message = { ...baseMsgCreateNFTResponse } as MsgCreateNFTResponse;
    return message;
  },

  toJSON(_: MsgCreateNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateNFTResponse>): MsgCreateNFTResponse {
    const message = { ...baseMsgCreateNFTResponse } as MsgCreateNFTResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateNFT(request: MsgCreateNFT): Promise<MsgCreateNFTResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateNFT(request: MsgCreateNFT): Promise<MsgCreateNFTResponse> {
    const data = MsgCreateNFT.encode(request).finish();
    const promise = this.rpc.request("thenalab.tsc.tsc.Msg", "CreateNFT", data);
    return promise.then((data) =>
      MsgCreateNFTResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
