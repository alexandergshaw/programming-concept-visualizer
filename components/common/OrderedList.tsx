import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface OrderedListProps {
    title?: string;
    items: string[];
    headingSize?: 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1';
    listStyleType?: 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman';
}

const OrderedList: React.FC<OrderedListProps> = (props: OrderedListProps) => {
    return (
        <div>
            <Typography variant={props.headingSize || 'h6'} gutterBottom>
                {props.title && props.title}
            </Typography>
            <List style={{ listStyleType: props.listStyleType || 'decimal', paddingLeft: '20px' }}>
                {props.items.map((item, index) => (
                    <ListItem key={index} style={{ display: 'list-item' }}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default OrderedList;