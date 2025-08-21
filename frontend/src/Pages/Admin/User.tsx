import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, type GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { Paper, Button, TextField, Stack } from '@mui/material';
import { EditIcon } from 'lucide-react';
import { DeleteIcon } from 'lucide-react';
import axios from 'axios';

interface UserType {
    _id: string;
    name: string;
    role: string;
    email?: string;
}

export default function UserTable() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/users/list', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const gridRows = response.data.data.map((user: UserType) => ({
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email || 'N/A',
                }));

                setRows(gridRows);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchData();
    }, []);

    // Search filter
    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers for actions
    const handleAddUser = () => {
        console.log('Add User clicked');
        // Open add user modal or navigate to form
    };

    const handleEditUser = (id: string) => {
        console.log('Edit User:', id);
        // Open edit modal or navigate to edit form
    };

    const handleDeleteUser = (id: string) => {
        console.log('Delete User:', id);
        // Call API to delete user
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleEditUser(params.id as string)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteUser(params.id as string)}
                />,
            ],
        },
    ];

    return (
        <Paper sx={{ height: '100%', width: '100%', padding: 2 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleAddUser}>
                    Add User
                </Button>
                <TextField
                    type="text"
                    label="Search by name"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Stack>

            <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
