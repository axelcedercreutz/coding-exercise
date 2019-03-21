import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import { updateValue } from 'actions';
// import { SimpleDatePicker } from 'simple-ts-date-picker';
import 'simple-ts-date-picker/dist/simple_datepicker.css';
import { ReduxState } from 'services/types';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import originalMoment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(originalMoment);

interface DispatchProps {
    updateValue: (value: any) => void
}

interface StateToProps {
    value: any
}

 interface State {
    value: any
} 

type Props = DispatchProps & StateToProps & WithStyles<typeof styles> & RouteComponentProps<{}>;


class DatePicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const today = moment();
        this.state = {
            value: moment.range(today.clone().subtract(7, 'days'), today.clone()),
        };
        // this.onValueChange = this.onValueChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(value: any) {
        console.log(value);
        this.setState({ value });
        this.props.updateValue(value);
    }
    /* onValueChange(value: Date) {
        console.log(this.state.value);
        this.setState({ date: value.toISOString() });
        console.log(this.state.date);
        this.props.updateDate(value.toISOString());
    } */
    /* renderPicker() {
        const label = this.props.label;
        if (label === 'START') {
            const date = this.state.date;
            return <SimpleDatePicker value={new Date(date)} onChange={this.onValueChange} />;
        }
        else {
            const date = this.state.date;
            return <SimpleDatePicker value={new Date(date)} onChange={this.onValueChange} />;
        }
    } */
    // {this.renderPicker()}
    render() {
        return(
            <div>
                    <DateRangePicker value={this.state.value} onSelect={this.onSelect}/>
            </div>
        );
    }
}
const styles = (theme: Theme) => createStyles({
    nested: {
        paddingLeft: theme.spacing.unit * 3,
    },
    capitalize: {
        textTransform: 'capitalize',
    }
}); 

const mapStateToProps = ({ value }: ReduxState): StateToProps => {
    return { value };
};

const dispatchProps: DispatchProps = {
    updateValue,
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, dispatchProps)(DatePicker)));