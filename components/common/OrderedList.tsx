import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface OrderedListItem {
    text: string;
    children?: OrderedListItem[];
}

interface OrderedListProps {
    title?: string;
    items: (string | OrderedListItem)[];
    headingSize?: 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1';
    listStyleType?: 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman';
}

const isOrderedListItem = (item: string | OrderedListItem): item is OrderedListItem =>
    typeof item === 'object' && 'text' in item;

const renderList = (
    items: (string | OrderedListItem)[],
    listStyleType: OrderedListProps['listStyleType'] = 'decimal',
    level: number = 0
) => (
    <List
        style={{
            listStyleType: listStyleType || 'decimal',
            paddingLeft: `${20 + level * 20}px`,
        }}
    >
        {items.map((item, index) => {
            if (isOrderedListItem(item)) {
                return (
                    <ListItem key={index} style={{ display: 'list-item' }}>
                        <ListItemText primary={item.text} />
                        {item.children && item.children.length > 0 && (
                            renderList(
                                item.children,
                                // Alternate list style for sublists
                                listStyleType === 'decimal' ? 'lower-alpha' : 'decimal',
                                level + 1
                            )
                        )}
                    </ListItem>
                );
            } else {
                return (
                    <ListItem key={index} style={{ display: 'list-item' }}>
                        <ListItemText primary={item} />
                    </ListItem>
                );
            }
        })}
    </List>
);

const OrderedList: React.FC<OrderedListProps> = (props: OrderedListProps) => {
    return (
        <div>
            <Typography variant={props.headingSize || 'h6'} gutterBottom>
                {props.title && props.title}
            </Typography>
            {renderList(props.items, props.listStyleType)}
        </div>
    );
};

export type { OrderedListItem };
export default OrderedList;