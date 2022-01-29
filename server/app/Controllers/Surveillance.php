<?php

namespace App\Controllers;

use App\Models\SurveillanceModel;
use App\Models\RemarkHistoryModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\Response;
use CodeIgniter\I18n\Time;
use CodeIgniter\HTTP\Files\UploadedFile;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use DateTime;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use function PHPSTORM_META\type;

class Surveillance extends ResourceController
{
    protected $modelName = 'App\Models\SurveillanceModel';
    protected $format = 'json';
    protected $datetime;
    protected $PATH_UPLOADED = './assets/upload/';
    protected $validation;
    protected $email;

    // protected $modelHistory;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
        date_default_timezone_set('Asia/Jakarta');
        $this->datetime = date('Y-m-d H:i:s');
        $validation =  \Config\Services::validation();
        $email = \Config\Services::email();
        // $this->modelHistory = new RemarkHistoryModel();
    }

    public function index()
    {
        //return $this->respond($this->model->findAll());
        return $this->indexByLocation($lokasi = null, $type = null);
    }

    public function getDataBackload($lokasi = null)
    {
        $status = 'backload';
        //tapi kalo id tools nya null dia bakal nampil seluruh tools yg ada di lokasi tsb (view all tools in spesific location)
        $arrParam = ['location' => $lokasi, 'status =' => $status];

        $model = new SurveillanceModel();
        $data = $model->where($arrParam)
            ->orderBy('maintenance_date', 'DESC')
            ->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function indexByLocation($lokasi = null, $type = null)
    {
        #indexnya bakal nampilin tools yg bukan backload sesuai lokasinya 
        //$data = $this->model->getWhere(['location' => $lokasi])->getResult();
        //param buat detil tools yg ada di lokasi tsb
        $status = 'backload';
        // $type = 'TOOLS';
        #tapi kalo id tools nya null dia bakal nampil seluruh tools yg ada di lokasi tsb (view all tools in spesific location)
        // $arrParam = ['location' => $lokasi, 'id_surv' => $idTools];
        $arrParam = ['location' => $lokasi, 'type' => $type, 'status!=' => $status];
        if (is_null($type) || $type == '') $arrParam = ['location' => $lokasi, 'status!=' => $status];

        $model = new SurveillanceModel();
        $data = $model->where($arrParam)
            ->orderBy('maintenance_date', 'DESC')
            ->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function create()
    {
        #ini kalo dari frontend
        // $data = $this->request->getPost();
        // $data1 = json_decode(json_encode($input), true);
        // $data2 = key((array)json_decode(json_encode($input), true));

        // $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        // $data = str_replace('_', ' ', $data3);
        $data = [
            'item' => $this->request->getVar('item'),
            'location' => $this->request->getVar('location'),
            'sn' => $this->request->getVar('sn'),
            'pn' => $this->request->getVar('pn'),
            'plan' => $this->request->getVar('plan'),
            'steelbox' => $this->request->getVar('steelbox'),
            'status' => $this->request->getVar('status'),
            'type' => $this->request->getVar('type'),
            'qty' => $this->request->getVar('qty'),
            'condition' => $this->request->getVar('condition'),
            'cert_date' => $this->request->getVar('cert_date'),
            'tools_date_in' => $this->request->getVar('tools_date_in'),
            'maintenance_by' => $this->request->getVar('maintenance_by'),
            'maintenance_date' => $this->datetime,
        ];


        $item = new \App\Entities\Surveillance();
        $item->fill($data);
        $item->maintenance_date = $this->datetime;

        $created = $this->model->save($item);
        if ($created) {
            $code = 200;
            $msg = 'insert success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = 'insert failed';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
    }

    public function uploadFile($file)
    {
        // $file = $this->request->getFile('remark_file');
        $rules = [
            'remark_file' => 'uploaded[remark_file]|max_size[remark_file,10240]|ext_in[remark_file,pdf,png,jpg,jpeg,heif,hevc,xlsx,docx,txt]',
        ];
        //cek uploaded via http
        if (!$file->isvalid()) {
            return 'error';
        }
        $namaFileBaru = $file->getRandomName();
        $file->move($this->PATH_UPLOADED, $namaFileBaru);
        return $file;
    }


    #update harian
    public function update($id = null)
    {
        #cara3
        $data = [
            'id_surv' => $id,
            'item' => $this->request->getVar('item'),
            'location' => $this->request->getVar('location'),
            'subLocation' => $this->request->getVar('subLocation'),
            'sn' => $this->request->getVar('sn'),
            'pn' => $this->request->getVar('pn'),
            'plan' => $this->request->getVar('plan'),
            'steelbox' => $this->request->getVar('steelbox'),
            'status' => $this->request->getVar('status'),
            'type' => $this->request->getVar('type'),
            'qty' => $this->request->getVar('qty'),
            'condition' => $this->request->getVar('condition'),
            'cert_date' => $this->request->getVar('cert_date'),
            'tools_date_in' => $this->request->getVar('tools_date_in'),
            'maintenance_by' => $this->request->getVar('maintenance_by'),
            'maintenance_date' => $this->datetime,
        ];

        #cara1
        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);
        $surv->maintenance_date = $this->datetime;
        $update = $this->model->save($surv);


        if ($update) {
            $code = 200;
            $msg = 'update success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = 'update failed';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
        // return $this->respondUpdated($surv);
    }

    public function show($id = null)
    {
        $input = $this->model->find($id);
        if (!$input) {
            return $this->fail('id not found');
        }
        $model = new SurveillanceModel();
        $data = $model->getDetail($id);
        return $this->respond($data);
    }

    #delete = set status jadi 0 + update untuk remove (backllad / handover)
    public function delete($id = null)
    {
        #tambahin kondisi : yg bisa dihapus cuma yg statusnya installed & backload
        $data = $this->model->find($id);
        if (!$data) {
            return $this->fail('id not found');
        }
        $existStatus = $data->status;
        // $data->status = 2;
        // if ($existStatus != 'Backload' && $existStatus != 'Installed') {
        //     return $this->respond($response = [
        //         'status' => 200,
        //         'error' => true,
        //         'data' => 'status item must be installed or backload',
        //     ], 200);
        // }

        $action = $this->model->delete($id);
        if ($action) {
            $code = 200;
            $msg = 'delete success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = $action->geterrorMessage(); //'handover failed';
            $response = [
                'status' => $code,
                'error' => true,
                'data' => $msg,
            ];
        }

        // $this->deleteFile($data->remark_file);
        return $this->respond($response, $code);
    }

    public  function deleteFile($file = null)
    {
        if (file_exists($this->PATH_UPLOADED . $file) && $file != null) {
            //kalo ada diapus dulu biar file ga numpuk di db
            unlink($this->PATH_UPLOADED . $file);
        }
    }

    public function handover($id = null)
    {
        //validasi
        $existItem = $this->model->find($id);

        // $dataFile = $this->request->getFile('remark_file');
        $data = [
            'id_surv' => $id,
            // 'item' => $this->request->getVar('item'),
            // 'location' => $this->request->getVar('location'),
            // 'sn' => $this->request->getVar('sn'),
            // 'pn' => $this->request->getVar('pn'),
            // 'plan' => $this->request->getVar('plan'),
            // 'steelbox' => $this->request->getVar('steelbox'),
            // // 'status' => $this->request->getVar('status'),
            // 'type' => $this->request->getVar('type'),
            // 'qty' => $this->request->getVar('qty'),
            // 'condition' => $this->request->getVar('condition'),
            // 'cert_date' => $this->request->getVar('cert_date'),
            // 'tools_date_in' => $this->request->getVar('tools_date_in'),
            'maintenance_by' => $this->request->getVar('maintenance_by'),
            'remark' => $this->request->getVar('remark'),
            // 'remark_file' => $dataFile->getName(),
            'maintenance_date' => $this->datetime,
        ];

        #insert to surveillance
        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);

        $dataHistory = [
            'item' => $id,
            'create_by' => $data['maintenance_by'],
            'remark' => $data['remark'],
            'create_date' => $data['maintenance_date'],
        ];
        #prepare object to save into history
        $remark = new \App\Entities\RemarkHistory();
        $modelHistory = new RemarkHistoryModel();
        $remark->fill($dataHistory);

        /*if ($data['remark_file']) {
            #2
            $old_file = $existItem->remark_file;
            //file dengan id item tersebut ada ga?
            if (file_exists($this->PATH_UPLOADED . $old_file) && $old_file != null) {
                //kalo ada diapus dulu biar file ga numpuk di db
                unlink($this->PATH_UPLOADED . $old_file);
            }
            $file = $this->uploadFile($this->request->getFile('remark_file'));
            if ($file == 'error') {
                return $this->respond([
                    'status' => 400,
                    'error' => true,
                    'data' => 'File format is not supported. File Format Supported : pdf, png, jpg, jpeg, heif, hevc, xlsx, docx, txt. Size maximum : 10 Mb'
                ], 400);
            }
            // $surv->remark_file = $file->getName();
        }*/

        $action = $this->model->save($surv); //save update into surveillance
        if ($action) {
            $action2 = $modelHistory->save($remark); //save insert into surveillance
            $msg = 'update remark surveillance succes';
        }

        if ($action2) {
            $code = 200;
            $msg = 'update remark history succes';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = $action->geterrorMessage(); //'handover failed';
            $response = [
                'status' => "action2 gagal",
                'error' => true,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
    }

    public function download($id = null)
    {
        $model = new SurveillanceModel();
        $data = $model->find($id);
        if (!$data) {
            return $this->fail('id not found');
        }
        return $this->response->download('./assets/upload/' . $data->remark_file, null);
    }

    public function sendEmail()
    {
        $email = \Config\Services::email();
        $email->initialize($this->emailConfig());
        $email->setFrom('tesarradiputro@gmail.com', 'TEssar');
        $email->setTo('jendelapagi1@gmail.com', 'jendela');
        $email->setSubject('[Fas-Slb] - Contact Us');
        $email->setMessage('Testing isi emailnya dari method kedua');

        $sending = $email->send();
        if ($sending) {
            return $this->respond([
                'status' => 200,
                'error' => false,
                'data' => 'email sent',
            ], 200);
        } else return $this->respond([
            'status' => 400,
            'error' => true,
            'data' => print_r($email->printDebugger(['headers'])),
        ], 200);
    }

    public function emailConfig()
    {
        $config['protocol'] = "smtp";
        $config['SMTPHost'] = "smtp.gmail.com";
        $config['SMTPPort'] = "587";
        $config['SMTPUser'] = "tesarradiputro@gmail.com";
        $config['SMTPPass'] = "85904875";
        $config['SMTPCrypto'] = "tls"; //very important line, don't remove it
        $config['SMTPTimeout'] = "5"; //google hint
        $config['mailtype'] = "text";
        $config['charset']  = "utf-8";
        $config['newline'] = "\r\n";
        return $config;
    }

    public function export_to_excel($id_loc = null, $status = null)
    {
        $model = new SurveillanceModel();
        $survModel = $model->listJoinAsset($id_loc, $status);

        $spreadsheet = new Spreadsheet();
        $spreadsheet->setActiveSheetIndex(0)
            ->setCellValue('A1', 'No')
            ->setCellValue('B1', 'Type')
            ->setCellValue('C1', 'Item')
            ->setCellValue('D1', 'PN')
            ->setCellValue('E1', 'SN')
            ->setCellValue('F1', 'Qty')
            ->setCellValue('G1', 'Condition')
            ->setCellValue('H1', 'Status')
            ->setCellValue('I1', 'Remark')
            ->setCellValue('J1', 'Cert Date')
            ->setCellValue('K1', 'Arrival Date')
            ->setCellValue('L1', 'Steelbox')
            ->setCellValue('M1', 'Location')
            ->setCellValue('N1', 'Plan')
            ->setCellValue('O1', 'Maintenance by') //maintenance_by + phone
            ->setCellValue('P1', 'Maintenance date'); //maintenance_by + phone

        $column = 2;

        foreach ($survModel as $data) {
            $spreadsheet->setActiveSheetIndex(0)
                ->setCellValue('A' . $column, $column)
                ->setCellValue('B' . $column, $data['type'])
                ->setCellValue('C' . $column, $data['item'])
                ->setCellValue('D' . $column, $data['pn'])
                ->setCellValue('E' . $column, $data['sn'])
                ->setCellValue('F' . $column, $data['qty'])
                ->setCellValue('G' . $column, $data['condition'])
                ->setCellValue('H' . $column, $data['status'])
                ->setCellValue('I' . $column, $data['remark'])
                ->setCellValue('J' . $column, $data['cert_date'])
                ->setCellValue('K' . $column, date_format(new DateTime($data['tools_date_in']), "Y-m-d"))
                ->setCellValue('L' . $column, $data['steelbox'])
                ->setCellValue('M' . $column, $data['nama_lokasi'])
                ->setCellValue('N' . $column, $data['plan'])
                ->setCellValue('O' . $column, $data['maintenance_by'] . ' - ' . $data['phone'])
                ->setCellValue('P' . $column, date_format(new DateTime($data['maintenance_date']), "Y-m-d"));

            $column++;
            $lokasi = $data['nama_lokasi'];
        }

        $writer = new Xlsx($spreadsheet);
        $filename = date('Y-m-d-His') . '-' .  $lokasi . '-' . $status;
        if ($status == 'notbackload') $filename = date('Y-m-d-His') . '-' .  $lokasi;

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename=' . $filename . '.xlsx');
        header('Cache-Control: max-age=0');

        $writer->save('php://output');
    }
}
