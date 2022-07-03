package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/thenalab/tsc/x/tsc/types"
)

func (k msgServer) CreateNFT(goCtx context.Context, msg *types.MsgCreateNFT) (*types.MsgCreateNFTResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreateNFTResponse{}, nil
}
