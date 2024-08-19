import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const ProfilTable = ({ profilsList, isAdmin, editProfil, deleted, handleDetailClick }) => {

  

  const filteredProfilsList = isAdmin ? profilsList : profilsList.filter(val => val.profil === '');

  console.log('filteredProfilsList   List:', filteredProfilsList);
    
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: '#', size: 50 },
      ...(isAdmin ? [{ accessorKey: 'profil', header: 'Profil', size: 150 }] : []),
      { accessorKey: 'titre', header: 'Titre', size: 150 },
      { accessorKey: 'experience', header: 'Années d\'expérience', size: 150 },
      { accessorKey: 'tjm', header: 'TJM', size: 100 },
      { accessorKey: 'stack', header: 'Stack technique', size: 200 },
      { accessorKey: 'disponibilite', header: 'Disponibilités', size: 150 },
      { accessorKey: 'mobilite', header: 'Mobilité', size: 150 },
      { accessorKey: 'statu', header: 'Status', size: 150 },
      { accessorKey: 'contact', header: isAdmin ? 'Contact' : '', size: 150 },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => (
          <div className="btn-group" role="group" aria-label="Basic example">
            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={() => editProfil(row.original)}
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleted(row.original)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => handleDetailClick(row.original.id)}
              className="btn btn-success"
            >
              CV
            </button>
          </div>
        ),
      },
    ],
    [isAdmin, editProfil, deleted, handleDetailClick]
  );

  console.log('Columns:', columns);

    const table = useMaterialReactTable({
      columns,
      data: profilsList   || [], 
    });

  return <MaterialReactTable table={table} />;
};

export default ProfilTable;
