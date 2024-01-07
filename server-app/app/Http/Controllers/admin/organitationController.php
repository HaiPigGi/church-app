<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\organitationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class organitationController extends Controller
{

    /**
     * show all organitation 
     *
     * @return void
     */
    public function getAllOrganitation()
    {
        $organisations = organitationModel::all();
        return response()->json(['organitation' => $organisations], 200);
    }

    /**
     * show organitation by id
     * 
     * @return void
     */

    public function getAllOrganitationById($id)
    {
        $organitation = organitationModel::findOrFail($id);

        if (!$organitation) {
            return response()->json(['error' => 'Organitation Not Found'], 404);
        }
        return response()->json(['organitation' => $organitation], 200);
    }

    /**
     * store to database 
     * @return \Illuminate\Http\JsonResponse
     */
    protected function store(Request $request)
    {
        $request->validate([
            'name_organitation' => 'required|string',
            'description' => 'required|string',
            'date_of_establishment' => 'required|date',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        try {
            DB::beginTransaction();

            $image = $request->file('image');
            $image->storeAs('public/organitation', $image->hashName());
            $organitation = organitationModel::create($request->all());
            DB::commit();
            return response()->json(['organitation' => $organitation], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $organitation], 500);
        }
    }

    /**
     * Update to Database organitation
     *
     * @param Request $request
     * @param [type] $id
     * @return void
     */
    protected function update(Request $request, $id)
    {
        $request->validate([
            'name_organitation' => 'required|string',
            'description' => 'required|string',
            'date_of_establishment' => 'required|date',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        try {
            DB::beginTransaction();
            $image = $request->file('image');
            $image->storeAs('public/organitation', $image->hashName());
            $organitation = organitationModel::finOrFail($id);

            if (!$organitation) {
                return response()->json(['message' => ''], 404);
            }
            $organitation->update($request->all());

            DB::commit();

            return response()->json(['organitation' => $organitation], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Delete using id organitation to remove it 
     * 
     * 
     *  @return \Illuminate\Http\JsonResponse
     */
    protected function delete($id)
    {
        try {
            DB::beginTransaction();
            $organitation = organitationModel::findOrfail($id);
            if (!$organitation) {
                return response()->json(['message' => 'Not Found'], 404);
            }
            $organitation->delete();

            DB::commit();

            return response()->json(['message' => 'Organitation deleted successfully'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
