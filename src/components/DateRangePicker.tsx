import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import 'simple-ts-date-picker/dist/simple_datepicker.css';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import originalMoment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(originalMoment);

interface DispatchProps {
    updateValue: (value: any) => void
}

 interface State {
    value: any
} 

type Props = DispatchProps & WithStyles<typeof styles> & RouteComponentProps<{}>;


class DatePicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const today = moment();
        this.state = {
            value: moment.range(today.clone().subtract(7, 'days'), today.clone()),
        };
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(value: any) {
        value.start = value.start.subtract(22, 'hours');
        value.end = value.end.add(2, 'hours');
        this.setState({ value });
        this.props.updateValue(value);
    }
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

export default withStyles(styles)(withRouter(DatePicker));