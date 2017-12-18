import { cfg, exchange, token, web3 } from 'services/smart-contracts/ADX'
import { GAS_PRICE, MULT, DEFAULT_TIMEOUT } from 'services/smart-contracts/constants'
import { setWalletAndGetAddress, toHexParam } from 'services/smart-contracts/utils'
import { encrypt } from 'services/crypto/crypto'
import { registerItem } from 'services/smart-contracts/actions'
import { ItemsTypes } from 'constants/itemsTypes'

// TODO: check if that values can be changed
const GAS_LIMIT_APPROVE_0_WHEN_NO_0 = 15136 + 1
// const GAS_LIMIT_APPROVE_0_WHEN_0 = 30136 + 1
const GAS_LIMIT_APPROVE_OVER_0_WHEN_0 = 45821 + 1

const GAS_LIMIT = 450000

// WARNING: hardcoded for now
const adxReward = 200

// NOTE: We use hrd coded gas values because they are always same 
export const approveTokensEstimateGas = ({ _addr, amountToApprove, prKey } = {}) => {
    let amount = toHexParam(amountToApprove * MULT)

    return new Promise((resolve, reject) => {
        token.methods
            .allowance(_addr, cfg.addr.exchange)
            .call()
            .then((allowance) => {
                let gas
                if (toHexParam(parseFloat(allowance)) === amount) {
                    gas = 0 // no need to change or GAS_LIMIT_APPROVE_0_WHEN_0
                } else if (allowance !== 0) {
                    gas = GAS_LIMIT_APPROVE_0_WHEN_NO_0 + GAS_LIMIT_APPROVE_OVER_0_WHEN_0
                } else {
                    gas = GAS_LIMIT_APPROVE_OVER_0_WHEN_0
                }

                return resolve(gas)
            })
            .catch((err) => {
                console.log('approveTokensEstimateGas err', err)
                reject(err)
            })
    })
}

/**
 * @param {string} _adunitId - adunit ID
 * @param {number} _target - target, in points to be achieved (integer)
 * @param {number} _rewardAmount - reward amount
 * @param {number} _timeout - timeout
 * @param {string} _peer - meta
 * @param {string} prKey - private key
 */
export const approveTokens = ({ _addr, amountToApprove, prKey } = {}) => {

    let amount = toHexParam(amountToApprove * MULT)

    return new Promise((resolve, reject) => {
        // NOTE: to set new approve first set approve to 0
        // https://github.com/OpenZeppelin/zeppelin-solidity/blob/7b9c1429d918a3cf685a1e85fd497d9cc3cf350e/contracts/token/StandardToken.sol#L45
        token.methods
            .allowance(_addr, cfg.addr.exchange)
            .call()
            .then((allowance) => {
                if (toHexParam(parseFloat(allowance)) === amount) {
                    return false
                } else if (allowance !== 0) {
                    return token.methods.approve(cfg.addr.exchange, 0)
                        .send({ from: _addr, gas: GAS_LIMIT, gasPrice: GAS_PRICE })
                } else {
                    return true
                }
            })
            .then((goApprove) => {
                if (goApprove) {
                    return token.methods.approve(cfg.addr.exchange, amount)
                        .send({ from: _addr, gas: GAS_LIMIT, gasPrice: GAS_PRICE })
                }

                return amountToApprove * MULT
            })
            .then((result) => {
                // TODO: what to return
                return resolve(!!result)
            })
            .catch((err) => {
                console.log('token approve err', err)
                reject(err)
            })
    })
}