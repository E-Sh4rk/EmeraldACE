
type t = ((int * ((int list) list)) list) * (((int list) list) option)

let load_from_dir dirname =
  try (
    IO_utils.enumerate_files dirname ".txt"
    |> List.map (fun x ->
      let path = Filename.concat dirname x in
      let str = Filename.basename x |> Filename.remove_extension in
      let i = int_of_string str in
      let arm = Parse.from_filename ~headers:false path |> snd
        |> Optimizer.do_not_fix_arm in
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
  )
  with Optimizer.CannotOptimize ->
    failwith "Exit codes cannot be tweaked (please remove interrogation marks)."

let load_from_parsed_file (h, arm) =
  try (
    let codes = arm |> Optimizer.do_not_fix_arm |>
      List.map (fun arm ->
        Arm.arm_to_binary arm |>
        List.map Name.codes_for_command |>
        Name.preferred_code
      )
    in
    match Preprocess.get_param h "start" with
    | HInt i -> ([(Name.int32_to_int i, codes)], None)
    | HNone -> ([], Some codes)
    | _ -> failwith "Exit code has invalid headers."
  )
  with Optimizer.CannotOptimize ->
    failwith "Exit codes cannot be tweaked (please remove interrogation marks)."

let load_from_file filename =
  Parse.from_filename ~headers:true filename |>
  load_from_parsed_file

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

