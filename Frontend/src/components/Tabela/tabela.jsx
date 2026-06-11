import { Table } from "react-bootstrap"
import style from "./tabela.module.css"

const Tabela = ({ columns, rows, keyField, handleClick }) => {
    return (
        <div className={style.divTable}>

        <Table responsive striped hover className={style.tabela}>

            <thead >
                <tr>
                    {columns.map(column => (
                        <td className={style.tabelaHeader} key={column.accessor}>{column.header}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {rows.map(row => (
                        <tr style={{cursor: "pointer"}} onClick={() => handleClick(row)} key={row[keyField]}>
                            {columns.map(column => (
                                <td key={column.accessor}>{column.render ? column.render(row) : row[column.accessor]}</td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </Table>
                    </div>
    )
}

export default Tabela