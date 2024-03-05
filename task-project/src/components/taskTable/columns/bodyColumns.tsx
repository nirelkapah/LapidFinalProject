import { Button, TableCell, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import TaskIcon from "@mui/icons-material/Task";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { Task } from "../../../model/task";



enum TaskStatus {
    open = 'Open',
    closed = 'Closed',
    urgent = 'Urgent'
}

enum TaskPriority {
    top = 'Top',
    minor = 'Minor',
    regular = 'Regular'
}

export const bodyTableCell = {

    getRegularCell: (text: string | number) => {
        return(
            <TableCell align="center">{text}</TableCell>
        )
    },

    getStatusCell: (status: string) => {
        return (
            <TableCell align="center">

                {status === TaskStatus.open && (
                  <Tooltip title="Open Task" arrow>
                  <NoteAddIcon sx={{color: '#00c0a6'}}/>
                  </Tooltip>
                )}

                {status === TaskStatus.urgent && (
                  <Tooltip title="Urgent Task" arrow>
                  <PlagiarismIcon sx={{color: '#efcf00'}} />
                  </Tooltip>
                )}

                {status === TaskStatus.closed && (
                  <Tooltip title="Closed Task" arrow>
                  <TaskIcon  sx={{color: '#00bbf9'}} />
                  </Tooltip>
                )}

            </TableCell>
        )
    },

    getPriorityCell: (priority: string) => {
        return(
            <TableCell align="center">
            {priority === TaskPriority.top && (
            <Tooltip title="Top Priority" arrow>
            <KeyboardDoubleArrowUpIcon
            sx={{color: '#ef476f'}}
            />
            </Tooltip>
            )}

            {priority === TaskPriority.regular && (
            <Tooltip title="Regular Priority" arrow>
            <KeyboardArrowUpIcon sx={{color: '#f8961e'}}/>
            </Tooltip>
            )}

            {priority === TaskPriority.minor && (
            <Tooltip title="Minor Priority" arrow>
            <KeyboardArrowDownIcon sx={{color: '#ffdeb9'}}/>
            </Tooltip>
            )}
            </TableCell>
        )
    },

    getActionsCell: (task: Task, onClickShowTask: (task: Task) => void, onClickEditTask: (task: Task) => void, onClickDeleteTask: (task: Task) => void) => {
        return(
            <TableCell align="center" sx={{minWidth: 'fit-content'}}>

              <Button
                  variant="text"
                  onClick={() => onClickShowTask(task)}
                  sx={{width: 'fit-content', minWidth: 5}} size="small"
                  >
                  <Tooltip title="Show Task" arrow>
                  <DescriptionIcon  sx={{color: '#7046ac'}} />
                  </Tooltip>
                </Button>

                <Button
                  variant="text"
                  onClick={() => onClickEditTask(task)}
                  sx={{width: 'fit-content', minWidth: 40}} size="small"
                  >
                  <Tooltip title="Edit Task" arrow>
                  <EditIcon sx={{color: '#a84bb0'}}/>
                  </Tooltip>
                </Button>

                <Button
                  variant="text"
                  onClick={() =>
                    onClickDeleteTask(
                      task
                    )
                  }
                  sx={{width: 'fit-content', minWidth: 5}} size="small"

                >
                  <Tooltip title="Delete Task" arrow>
                  <DeleteIcon sx={{color: '#e54fb3'}}/>
                  </Tooltip>
                </Button>
              </TableCell>
        )
    
    }
}

