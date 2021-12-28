import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider, COLLATERAL_DENOMS } from '../../address-provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral to burn.
 * @param amount of burn.
 */

interface Option {
  address: string;
  collateral: COLLATERAL_DENOMS;
  amount: string;
}

export const fabricatebAssetBurn =
  ({ address, collateral, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetTokenAddress = addressProvider.bAssetToken(collateral);
    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        burn: {
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };
