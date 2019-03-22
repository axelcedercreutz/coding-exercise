import * as React from 'react';
import { connect } from 'react-redux';
import { db } from 'services/firebase';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import { ReduxState } from 'services/types';
import { RemoteData, InStoreApi, ShopApi } from 'common/types';
import Container from 'components/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatePicker from '../components/DateRangePicker';
import CardComponent from '../components/Card';
import { updateValue } from 'actions';


interface DispatchProps {
    updateValue: (value: any) => void,
}

interface StateToProps {
    shop: ShopApi,
}

interface State {
    rentals: RemoteData<InStoreApi[]>,
    startDate: string,
    endDate: string,
}

type Props = StateToProps & DispatchProps & WithStyles<typeof styles>;

class Reports extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rentals: { kind: 'LOADING' },
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),

        };
    }

    componentDidMount() {
        this.getRentals();
    }

    getRentals() {
        const shopId = this.props.shop.id;
        const rentalsRef = db.collection('rentals')
            .where('shopId', '==', shopId)
            .where('endDate', '<=', this.state.endDate)
            .where('rentalState', '==', 'COMPLETED')
            .orderBy('endDate', 'asc');
        rentalsRef.get().then((querySnapshot) => {
            const rentalList: InStoreApi[] = [];
            for (const rentalDoc of querySnapshot.docs) {
                const rental = rentalDoc.data() as InStoreApi;
                 if (rental.startDate >= this.state.startDate) {
                    rentalList.push(rental);
                 }
            }
            const rentals: RemoteData<InStoreApi[]> = { kind: 'FETCHED', data: rentalList };
            this.setState({
                rentals
            });
        }, (error) => {
            const rentals: RemoteData<InStoreApi[]> = { kind: 'ERROR', error: error.message };
            this.setState({
                rentals
            });
        });
    }

    renderRentals() {
        const classes = this.props.classes;
        const rentals = this.state.rentals;
        if (rentals.kind === 'LOADING') {
            return <div>Loading</div>;
        }
        if (rentals.kind === 'ERROR') {
            return <div>{rentals.error}</div>;
        }
        const rentalData = rentals.data;
        const rentalDataRows = rentalData.map((rental) => {
            const responsiblePerson = rental.responsiblePerson;
            const name = responsiblePerson.firstName + ' ' + responsiblePerson.lastName;
            const startDate = new Date(rental.startDate).getTime();
            const date = new Date(rental.endDate).getTime();
            const price = rental.charge.amount;
            const priceString = (price / 100).toFixed(2);
            const renters = rental.shoppers.length;
            const rentalLength = (date - startDate) / (60*60*1000);
            return (
                <TableRow key={rental.id}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{rentalLength}</TableCell>
                    <TableCell align="right">{renters}</TableCell>
                    <TableCell align="right">{priceString}</TableCell>
                </TableRow>
            );
        });

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Rental length (h)</TableCell>
                        <TableCell align="right">How many persons</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rentalDataRows}
                </TableBody>
                </Table>
            </Paper>
        );
    }
    render() {
        const classes = this.props.classes;

        return (
            <Container>
                <Typography variant="h5" gutterBottom className={classes.header}>
                    Dummy report
                </Typography>
                < CardComponent rentals={this.state.rentals} label={'RENTALS'}/>
                    < CardComponent rentals={this.state.rentals} label={'REVENUE'}/>
                    < CardComponent rentals={this.state.rentals} label={'PRICE'}/>
                    < CardComponent rentals={this.state.rentals} label={'RENTAL_LENGTH'}/>
                <div className={classes.row}>
                        <DatePicker updateValue={(value: any) => {
                            this.setState(
                                {startDate: value.start.toISOString() , endDate: value.end.toISOString()}
                            );
                            this.getRentals();
                        }} />
                </div>
                {this.renderRentals()}
            </Container>
        );
    }
}

const styles = (theme: Theme) => createStyles({
    header: {
        marginBottom: 32,
    },
    datepics: {
        width: '50%' ,
        display: 'inline-block',
        textAlign: 'center',
    },
    row: {
        width: '100%',
        display: 'inline-block',
    },
    width40: {
        width: '40%',
        display: 'inline-block',
        margin: '0 5%',
    },
    leftAlign: {
        textAlign: 'left',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 400,
    },
    red: {
        color: '#ff0000' ,
    },
    default: {
        color: theme.palette.text.primary ,
    },
});

const mapStateToProps = ({ shops}: ReduxState): StateToProps => {
    const { activeShop } = shops;
    return { shop: activeShop! };
};

export default withStyles(styles)(connect(mapStateToProps, { updateValue })(Reports));
