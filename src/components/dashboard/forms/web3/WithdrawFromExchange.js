import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'
// import theme from 'components/dashboard/forms/theme.css'
// import Translate from 'components/translate/Translate'
import NewTransactionHoc from './TransactionHoc'
// import { Grid, Row, Col } from 'react-flexbox-grid'
// import numeral from 'numeral'
import Input from 'react-toolbox/lib/input'
// import { Button, IconButton } from 'react-toolbox/lib/button'

import scActions from 'services/smart-contracts/actions'
const { approveTokensEstimateGas } = scActions

class WithdrawFromExchange extends Component {

    render() {
        let tr = this.props.transaction
        let t = this.props.t

        return (
            <div>
                <span>Current balance: {this.props.stats.exchangeBalance[0]}  </span>
                <Input
                    type='text'
                    required
                    label={this.props.t('TOKENS_TO_WITHDRAW')}
                    name='withdrawAmount'
                    value={tr.withdrawAmount || ''}
                    onChange={(value) => this.props.handleChange('withdrawAmount', value)}
                />
            </div>
        )
    }
}

WithdrawFromExchange.propTypes = {
    actions: PropTypes.object.isRequired,
    label: PropTypes.string,
    trId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    transaction: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
    let persist = state.persist
    let memory = state.memory
    return {
        // trId: 'approve'
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

let WithdrawFromExchangeForm = NewTransactionHoc(WithdrawFromExchange)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawFromExchangeForm)
