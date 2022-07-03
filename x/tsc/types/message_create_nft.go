package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateNFT = "create_nft"

var _ sdk.Msg = &MsgCreateNFT{}

func NewMsgCreateNFT(creator string) *MsgCreateNFT {
	return &MsgCreateNFT{
		Creator: creator,
	}
}

func (msg *MsgCreateNFT) Route() string {
	return RouterKey
}

func (msg *MsgCreateNFT) Type() string {
	return TypeMsgCreateNFT
}

func (msg *MsgCreateNFT) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateNFT) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateNFT) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
