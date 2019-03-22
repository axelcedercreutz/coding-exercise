import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import { RemoteData, InStoreApi } from 'common/types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Spinner from 'components/Spinner';

interface StateToProps {
    rentals: RemoteData<InStoreApi[]>,
    label: string,
}

type Props = StateToProps & WithStyles<typeof styles>;

class CardComponent extends React.Component< Props> {
    constructor(props: Props) {
        super(props);
    }
    renderCard() {
        const rentals = this.props.rentals;
        const label = this.props.label;
        if (rentals.kind === 'LOADING') {
            return <CardContent><Spinner in={true} size={40} relative={true}/></CardContent>;
        }
        if (rentals.kind === 'ERROR') {
            return <div>{rentals.error}</div>;
        }
        const rentalAmount = rentals.data.length;
        if (label === 'RENTALS' ) {
            return(
                <CardContent>
                    <Typography variant="h5" component="h2">Amount of rentals</Typography>
                    <Typography component="p">{rentals.data.length}</Typography>
                </CardContent>
            );
        }
        if (label === 'REVENUE' ) {
            let revenue = 0;
            rentals.data.map((rental) => {
                revenue += (rental.charge.amount / 100);
            });
            return(
                <CardContent>
                    <Typography variant="h5" component="h2">Total Revenue</Typography>
                    <Typography component="p">{revenue.toFixed(2)   }</Typography>
                </CardContent>
            );
        }
        if (label === 'PRICE' ) {
            let revenue = 0;
            rentals.data.map((rental) => {
                revenue += (rental.charge.amount / 100);
            });
            let averagePrice = 0;
            if (rentalAmount !== 0) {
                averagePrice = revenue / rentalAmount;
            }
            return(
                <CardContent>
                    <Typography variant="h5" component="h2">Average Price</Typography>
                    <Typography component="p">{averagePrice.toFixed(2)}</Typography>
                </CardContent>
            );
        }
        if (label === 'RENTAL_LENGTH' ) {
            let averageLength = 0;
            rentals.data.map((rental) => {
                const startDate = new Date(rental.startDate).getTime();
                const date = new Date(rental.endDate).getTime();
                averageLength += (date - startDate) / (60*60*1000);
            });
            let averageRental = "0";
            if (rentalAmount !== 0) {
                averageRental = (averageLength / rentalAmount).toFixed();
            }
            return(
                <CardContent>
                    <Typography variant="h5" component="h2">Average length (h)</Typography>
                    <Typography component="p">{averageRental}</Typography>
                </CardContent>
            );
        }
        return(
            <CardContent>
                <Typography variant="h5" component="h2">{label}</Typography>
            </CardContent>
        );
    }

    render() {
        const classes = this.props.classes;
        return(
            <Card className={classes.card}>
                    {this.renderCard()}
            </Card>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    card: {
        margin: '30px 10px',
        minWidth: 250,
        width: '23%',
        display: 'inline-block',
        minHeight: 94,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
});

export default withStyles(styles) (CardComponent);