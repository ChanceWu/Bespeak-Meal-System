/**
 * Created by 叶子 on 2017/7/31.
 */
import { Component } from 'react';
import { connect } from 'react-redux';

class AuthWidget extends Component {
    render() {
    	console.log("this.props.auth.data: ");
    	console.log(this.props.auth.data);
        return this.props.children(this.props.auth.data || {});
    }
}

const mapStateToProps = state => {
    const { auth = {data: {}} } = state.httpData;
    return { auth };
};

export default connect(mapStateToProps)(AuthWidget);