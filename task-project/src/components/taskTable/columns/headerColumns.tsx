import { Button, Grid, TableCell } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { SortType, ColumnType } from "../../../model/sort";

const titlesMap = new Map([
    ['title', 'Title'],
    ['description', 'Description'],
    ['status', 'Status'],
    ['estimatedTime', 'Estimated Time (h)'],
    ['priority', 'Priority'],
    ['actions', 'Actions']
]);

enum ColumnDirection {
    up = 'up',
    down = 'down',
}

export const regularColumn = {

    get: (title: string) => {
        return(
            <TableCell key={title} align="center">
                {title}
            </TableCell>
        )
    }
}


export const sortColumn = {

    OrderByArray: (values: any[], orderType: any, direction: string) => 
    
    values.sort((a, b) => {
        if (a[orderType] < b[orderType]) {
            return direction === ColumnDirection.down ? -1 : 1
        }

        if (a[orderType] > b[orderType]) {
            return direction === ColumnDirection.down ?  1 : -1
        }

        return 0}
        ),

    get: (title: ColumnType, setSortBy: Dispatch<SetStateAction<SortType>>, sortBy: SortType) => {
        const temporaryTitle = titlesMap.get(title);
        return (
            
            <TableCell key={title} align="center">
                <Grid container alignItems={'center'} justifyContent={'center'} minWidth={'max-content'}>

                
                {temporaryTitle} 
                {!(sortBy.direction === ColumnDirection.up && sortBy.orderType=== title) &&
                <Button sx={{width: 10, minWidth: 5, marginLeft: 1}} size="small" >
                    <NorthIcon onClick={() => setSortBy({orderType: title, direction: 'up'})} sx={{width: 15}} />
                </Button>}
                
                {(sortBy.direction === ColumnDirection.up && sortBy.orderType=== title )&& 
                <Button sx={{width: 10, minWidth: 5, marginLeft: 1}} size="small">
                    <SouthIcon onClick={() => setSortBy({orderType: title, direction: 'down'})} sx={{width: 15}}/>
                </Button>}
                </Grid>
            </TableCell>
            
        )
    }
}
