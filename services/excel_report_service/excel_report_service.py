import openpyxl
import os


class ExcelReportService:

    @staticmethod
    def generate_excel(headers, data, report_name):
        os.makedirs('reports', exist_ok=True)
        workbook = openpyxl.Workbook()
        sheet = workbook.active
        sheet.append(headers)
        for row in data:
            sheet.append(list(row))
        file_name = os.path.join('reports', f'{report_name}.xlsx')
        workbook.save(file_name)
