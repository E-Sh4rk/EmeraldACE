
type t = ((int * ((int list) list)) list) * (((int list) list) option)

let load_from_dir dirname =
  Sys.readdir dirname
  |> Array.to_list
  |> List.filter (fun x -> Filename.extension x = ".txt")
  |> List.map (fun x ->
    let path = Filename.concat dirname x in
    let str = Filename.basename x |> Filename.remove_extension in
    let i = int_of_string str in
    let arm =
      match Parse.from_filename ~headers:false path with
      | Some (_, arm) -> arm
      | None -> failwith "Error while parsing exit codes." in
    let codes = arm |>
      List.map (fun arm ->
        Arm.arm_to_binary arm |>
        List.map Name.codes_for_command |>
        Name.preferred_code
      )
    in
    (i, codes)
  )
  |> List.sort (fun (i,_) (j,_) -> compare i j)
  |> (fun x -> (x, None))

let load_from_file filename =
  match Parse.from_filename ~headers:true filename with
  | Some (h, arm) ->
    let codes = arm |>
      List.map (fun arm ->
        Arm.arm_to_binary arm |>
        List.map Name.codes_for_command |>
        Name.preferred_code
      )
    in
    begin match Parser_ast.get_header h "start" with
    | HInt i -> ([(Name.int32_to_int i, codes)], None)
    | HNone -> ([], Some codes)
    | _ -> failwith "Exit code has invalid headers."
    end
  | None -> failwith "Error while parsing exit codes."

exception NoExitCode

let get_preferred (lst, default) i =
  try (
    let rec aux lst =
      match lst with
      | [] -> raise NoExitCode
      | (j, c)::_ when i <= j -> (j, c)
      | _::lst -> aux lst
    in
    aux lst
  ) with NoExitCode -> (
    match default with
    | None -> raise NoExitCode
    | Some c -> (i, c)
  )

