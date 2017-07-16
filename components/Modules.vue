<template>
  <div class="card bg-white" id="modules-container">
    <div class="card-content">



      <!-- Tab Definitions -->
      <q-tabs :refs="$refs" default-tab="modules" class="justified" :class="user.theme">
        <q-tab name="modules" icon="storage">
          Modules
        </q-tab>
        <q-tab name="data" icon="sort">
          Data
        </q-tab>
        <q-tab name="sharing" icon="share">
          Sharing
        </q-tab>
        <q-tab name="options" icon="settings">
          Options
        </q-tab>
        <q-tab name="logout" icon="exit_to_app">
          Log out
        </q-tab>
      </q-tabs>



      <!-- Modules Tab -->
      <div ref="modules">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Modules</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <h5 class="left-inline">{{semester_text}}</h5>
                  <div class="right-inline">
                    <button class="primary circular positive" @click="add_module_dialog()">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Add Module</q-tooltip>
                      <i>add</i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <canvas id="text-canvas"></canvas>
                <div id="semester-select">
                  <span class="light-paragraph block-inline" id="semester-text">Semester:</span>
                  <q-pagination v-model="modules.semester" :min="1" :max="user.modules.length" class="block-inline"></q-pagination>
                  <div class="block-inline">
                    <button class="negative small circular" @click="remove_semester()">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Remove Semester</q-tooltip>
                      <i>exposure_neg_1</i>
                    </button>
                    <button class="positive small circular" @click="add_semester()">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Add Semester</q-tooltip>
                      <i>exposure_plus_1</i>
                    </button>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <q-data-table :data="user.modules[modules.semester-1]" :config="modules.config" :columns="modules.columns" ref="modules_table" id="modules_table">
                  <template slot="selection" scope="selection">
                    <button class="clear" @click="edit_modules(selection)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Edit Module</q-tooltip>
                      <i>edit</i>
                    </button>
                    <button class="clear" @click="su_activate(selection)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">S/U Module</q-tooltip>
                      <i>redo</i>
                    </button>
                    <button class="clear" @click="su_deactivate(selection)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Undo S/U</q-tooltip>
                      <i>undo</i>
                    </button>
                    <button class="clear" @click="delete_modules(selection)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Delete</q-tooltip>
                      <i>delete</i>
                    </button>
                  </template>
                </q-data-table>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <h5 class="left-inline">Semestral Average Point</h5>
                  <span class="right-inline text-bold" id="cap">{{semestral_cap}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Data Tab -->
      <div ref="data">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Data</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <h5 class="left-inline">Cumulative Average Point</h5>
                  <span class="right-inline text-bold" id="cap">{{cap}}</span>
                </div>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <h5 class="left-inline">Total Credits</h5>
                  <span class="right-inline text-bold" id="cap">{{total_credits.credits_done}} ({{total_credits.credits_done + total_credits.credits_planned}})</span>
                </div>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Modules</h5>
              </div>
              <div class="card-content">
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>University Level Requirements</td>
                        <td></td>
                        <td width="30px">{{ulr_mods.credits_done}}</td>
                        <td width="30px">({{ulr_mods.credits_done + ulr_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ulr_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ulr_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{ulr_mods.modules_done.length + ulr_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>Faculty Level Requirements</td>
                        <td></td>
                        <td width="30px">{{flr_mods.credits_done}}</td>
                        <td width="30px">({{flr_mods.credits_done + flr_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in flr_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in flr_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{flr_mods.modules_done.length + flr_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>Core Modules</td>
                        <td></td>
                        <td width="30px">{{rcm_mods.credits_done}}</td>
                        <td width="30px">({{rcm_mods.credits_done + rcm_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in rcm_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in rcm_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{rcm_mods.modules_done.length + rcm_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>Technical Electives</td>
                        <td></td>
                        <td width="30px">{{te_mods.credits_done}}</td>
                        <td width="30px">({{te_mods.credits_done + te_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in te_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in te_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{te_mods.modules_done.length + te_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>Industrial Attachment</td>
                        <td></td>
                        <td width="30px">{{ia_mods.credits_done}}</td>
                        <td width="30px">({{ia_mods.credits_done + ia_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ia_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ia_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{ia_mods.modules_done.length + ia_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="card" :class="table_bg">
                  <div class="card-title">
                    <table width="100%">
                      <tr>
                        <td>Unrestricted Electives</td>
                        <td></td>
                        <td width="30px">{{ue_mods.credits_done}}</td>
                        <td width="30px">({{ue_mods.credits_done + ue_mods.credits_planned}})</td>
                      </tr>
                    </table>
                  </div>
                  <div class="card-content">
                    <table width="100%">
                      <tr>
                        <td><span class="text-bold">Completed Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ue_mods.modules_done">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px">{{module.credits}}</td>
                        <td width="30px"></td>
                      </tr>
                      <tr>
                        <td><span class="text-bold">Planned Modules</span></td>
                      </tr>
                      <tr v-for="(module, index) in ue_mods.modules_planned">
                        <td width="55%">{{index + 1}}. {{module.code}}</td>
                        <td>{{module.grade}}</td>
                        <td width="30px"></td>
                        <td width="30px">({{module.credits}})</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td><span class="text-bold" style="text-align: right">Total Modules: {{ue_mods.modules_done.length + ue_mods.modules_planned.length}}</span></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Sharing Tab -->
      <div ref="sharing">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Sharing</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <h5 class="left-inline">Share with Others</h5>
                  <div class="right-inline">
                    <button class="primary circular positive" @click="add_shared_with_others_dialog()">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Add User</q-tooltip>
                      <i>add</i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <table width="100%" class="sharing">
                  <tr v-for="(user, index) in user.shared_with_others">
                    <td width="95%">{{user}}</td>
                    <td>
                      <button class="right-inline" @click="remove_shared_with_others(index)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Remove User</q-tooltip>
                        <i>delete</i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Shared with You</h5>
              </div>
              <div class="card-content">
                <table width="100%" class="sharing">
                  <tr v-for="(user, index) in user.shared_with_you">
                    <td width="95%"><a @click="view_shared_with_you(index)">{{user}}</a></td>
                    <td>
                        <button class="right-inline" @click="remove_shared_with_you(index)">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Remove User</q-tooltip>
                        <i>delete</i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Email</h5>
              </div>
              <div class="card-content">
                Enter an email address to send your module plan.
                <div class="column group">
                  <label>
                    Arrangement of Modules
                  </label>
                  <label>
                    <q-radio v-model="email_share_data.tab" val="modules"></q-radio>
                    &nbsp;By Semester
                  </label>
                  <label>
                    <q-radio v-model="email_share_data.tab" val="data"></q-radio>
                    &nbsp;By Module Type
                  </label>
                </div>
                <!--
                <div class="column group">
                  <label>
                    File Format:
                  </label>
                  <label>
                    <q-radio v-model="email_share_data.format" val="pdf"></q-radio>
                    &nbsp;PDF
                  </label>
                  <label>
                    <q-radio v-model="email_share_data.format" val="png"></q-radio>
                    &nbsp;PNG
                  </label>
                  <label>
                    <q-radio v-model="email_share_data.format" val="csv"></q-radio>
                    &nbsp;CSV
                  </label>
                </div>
                -->
                <div class="floating-label">
                  <input required type="text" v-model="email_share_data.email" class="full-width no-border" :class="{'has-error': $v.email_share_data.email.$error}" v-on:keyup.enter="email_share()">
                  <label>Email</label>
                </div>
                <button class="positive right-button" @click="email_share()">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Options Tab -->
      <div ref="options">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Options</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Download</h5>
              </div>
              <div class="card-content">
                <div class="column group">
                  <label>
                    Arrangement of Modules
                  </label>
                  <label>
                    <q-radio v-model="download_options.tab" val="modules"></q-radio>
                    &nbsp;By Semester
                  </label>
                  <label>
                    <q-radio v-model="download_options.tab" val="data"></q-radio>
                    &nbsp;By Module Type
                  </label>
                </div>
                <div class="column group">
                  <label>
                    File Format:
                  </label>
                  <label>
                    <q-radio v-model="download_options.format" val="pdf"></q-radio>
                    &nbsp;PDF
                  </label>
                  <label>
                    <q-radio v-model="download_options.format" val="png"></q-radio>
                    &nbsp;PNG
                  </label>
                  <label>
                    <q-radio v-model="download_options.format" val="csv"></q-radio>
                    &nbsp;CSV
                  </label>
                </div>
                <button class="positive right-button" @click="download()">
                  Download
                </button>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Theme</h5>
              </div>
              <div class="card-content">
                <div class="column group">
                  <label>
                    <q-radio v-model="user.theme" val="pink" @input="update_theme()"></q-radio>
                    &nbsp;Pink
                  </label>
                  <label>
                    <q-radio v-model="user.theme" val="indigo" @input="update_theme()"></q-radio>
                    &nbsp;Indigo
                  </label>
                  <label>
                    <q-radio v-model="user.theme" val="blue" @input="update_theme()"></q-radio>
                    &nbsp;Blue
                  </label>
                  <label>
                    <q-radio v-model="user.theme" val="teal" @input="update_theme()"></q-radio>
                    &nbsp;Teal
                  </label>
                  <label>
                    <q-radio v-model="user.theme" val="orange" @input="update_theme()"></q-radio>
                    &nbsp;Orange
                  </label>
                  <label>
                    <q-radio v-model="user.theme" val="blue-grey" @input="update_theme()"></q-radio>
                    &nbsp;Blue-grey
                  </label>
                </div>
                <button class="positive right-button" @click="save_theme()">
                  Save
                </button>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>API Key</h5>
              </div>
              <div class="card-content">
                The API key can be used with the Moduler API. Please keep it safe.
                <div class="floating-label">
                  <input readonly v-model="user.api_key" class="full-width no-border" id="api-copy-area">
                </div>
                <button class="negative right-button" @click="regenerate_api_key()">
                  Regenerate
                </button>
                <button class="positive right-button" @click="copy_api_key()" id="api-copy-button">
                  Copy
                </button>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Change Password</h5>
              </div>
              <div class="card-content">
                Enter your current password and new password to change your password.
                <div class="floating-label">
                  <input required type="password" v-model="change_password_data.old_password" class="full-width no-border" :class="{'has-error': $v.change_password_data.old_password_check.$error}" v-on:keyup.enter="change_password()">
                  <label>Current Password</label>
                </div>
                <div class="floating-label">
                  <input required type="password" v-model="change_password_data.new_password" class="full-width no-border" :class="{'has-error': $v.change_password_data.new_password.$error}" v-on:keyup.enter="change_password()">
                  <label>New Password</label>
                </div>
                <div class="floating-label">
                  <input required type="password" v-model="change_password_data.repeat_new_password" class="full-width no-border" :class="{'has-error': $v.change_password_data.repeat_new_password.$error}" v-on:keyup.enter="change_password()">
                  <label>Repeat New Password</label>
                </div>
                <button class="negative right-button" @click="change_password()">
                  Change Password
                </button>
              </div>
            </div>
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Delete Account</h5>
              </div>
              <div class="card-content">
                Enter your email address into the textbox to confirm deletion of this account. If you signed in with Google or Facebook, enter the email associated with your Google or Facebook account.
                <div class="floating-label">
                  <input required type="text" v-model="delete_data.email" class="full-width no-border" v-on:keyup.enter="delete_account()">
                  <label>Email</label>
                </div>
                <button class="negative right-button" @click="delete_account()">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Log Out Tab -->
      <div ref="logout">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Log Out</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Log Out</h5>
              </div>
              <div class="card-content">
                Are you sure you want to log out?
                <button class="positive right-button" @click="logout()">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Add Share Dialog Modal Definition -->
    <q-modal class="minimized" ref="add_share" :content-css="{color: 'rbga(0, 0, 0, 1.0)'}">
      <div class="modal-header">Add User</div>
      <div class="modal-body">
        <table>
          <tr class="dialog-table">
            <td>
              <label>Username/Email</label>
            </td>
            <td>
                <input required v-model="add_share.id" v-on:keyup.enter="add_shared_with_others()" />
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
            </td>
            <td align="right">
              <button class="negative clear" style="text-decoration: underline" @click="add_shared_with_others_dialog_close()">Close</button>
              <button class="positive" @click="add_shared_with_others()">Done</button>
            </td>
          </tr>
        </table>
      </div>
    </q-modal>



    <!-- Add Dialog Modal Definition -->
    <q-modal class="minimized" ref="add_dialog" :content-css="{color: 'rbga(0, 0, 0, 1.0)'}">
      <div class="modal-header">Add Module</div>
      <div class="modal-body">
        <table>
          <tr class="dialog-table">
            <td>
              <label>Module Code</label>
            </td>
            <td>
              <q-autocomplete v-model="add_data.code" @search="autocomplete" :delay="0">
                  <input required v-model="add_data.code" v-on:keyup.enter="add_module()"/>
              </q-autocomplete>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>MCs</label>
            </td>
            <td>
              <q-numeric v-model="add_data.credits" :min="0">
              </q-numeric>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Grade</label>
            </td>
            <td>
              <q-select type="list" v-model="add_data.grade" :options="add_data.grade_options">
              </q-select>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Type</label>
            </td>
            <td>
              <q-select type="list" v-model="add_data.type" :options="add_data.type_options">
              </q-select>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>S/U Option</label>
            </td>
            <td>
                <q-toggle v-model="add_data.su_option"></q-toggle>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Preclusions</label>
            </td>
            <td width="200px">
              {{add_data_preclusions}}
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Pre-requisites</label>
            </td>
            <td width="200px">
              {{add_data_prerequisites}}
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
            </td>
            <td align="right">
              <button class="negative clear" style="text-decoration: underline" @click="close_add_dialog">Close</button>
              <button class="positive" @click="add_module()">Done</button>
            </td>
          </tr>
        </table>
      </div>
    </q-modal>



    <!-- Edit Dialog Modal Definition -->
    <q-modal class="minimized" ref="edit_dialog">
      <div class="modal-header">Edit Module</div>
      <div class="modal-body">
        <table>
          <tr class="dialog-table">
            <td>
              <label>Module Code</label>
            </td>
            <td>
              <q-autocomplete v-model="edit_data.code" @search="autocomplete">
                  <input readonly required v-model="edit_data.code" v-on:keyup.enter="update_module()"/>
              </q-autocomplete>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>MCs</label>
            </td>
            <td>
              <q-numeric v-model="edit_data.credits" :min="0">
              </q-numeric>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Grade</label>
            </td>
            <td>
              <q-select type="list" v-model="edit_data.grade" :options="edit_data.grade_options">
              </q-select>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Type</label>
            </td>
            <td>
              <q-select type="list" v-model="edit_data.type" :options="edit_data.type_options">
              </q-select>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>S/U Option</label>
            </td>
            <td>
                <q-toggle v-model="edit_data.su_option"></q-toggle>
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Preclusions</label>
            </td>
            <td width="200px">
              {{edit_data_preclusions}}
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Pre-requisites</label>
            </td>
            <td width="200px">
              {{edit_data_prerequisites}}
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
            </td>
            <td align="right">
              <button class="negative clear" style="text-decoration: underline" @click="$refs.edit_dialog.close()">Close</button>
              <button class="positive" @click="update_module()">Done</button>
            </td>
          </tr>
        </table>
      </div>
    </q-modal>
    <div id="preload-font"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Validations from 'vuelidate'
  import {required, sameAs, minLength, email} from 'vuelidate/lib/validators'
  import {Utils, Toast, Loading} from 'quasar'
  import Horizon from '@horizon/client'
  import Axios from 'axios'
  import Sjcl from 'sjcl'
  import Modules from './modules.json'
  import smtp_data from '../../../smtp_api.json'
  
  Vue.use(Validations)
  
  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  function parse_modules () {
    return Modules.map(module => {
      return {
        value: module.code,
        label: module.code
      }
    })
  }

  function uuid () {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now()
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }

  export default {
    name: 'Modules',
    data () {
      return {
        //
        //
        //
        // Universal Veriables
        user: {
          id: '',
          login_data: {
            username: '',
            password: ''
          },
          email: '',
          validated: true,
          validation_code: '',
          reset_state: false,
          reset_code: '',
          api_key: '',
          theme: '',
          modules: [[{
            code: '',
            credits: 0,
            type: '',
            grade: '',
            su_option: false,
            final_grade: ''
          }]],
          shared_with_others: [],
          shared_with_you: []
        },
        //
        //
        //
        // Modules Tab Variables
        modules: {
          semester: 1,
          config: {
            title: '&nbsp;',
            rowHeight: '50px',
            responsive: true,
            selection: 'multiple',
            messages: {
              noData: '<i>warning</i> No modules to show. Add a module first.',
              noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
            }
          },
          columns: [
            {
              label: 'Module Code',
              field: 'code',
              width: '75px',
              classes: this.table_bg,
              sort: 'string'
            },
            {
              label: 'MCs',
              field: 'credits',
              width: '35px',
              classes: this.table_bg,
              sort: true
            },
            {
              label: 'Type',
              field: 'type',
              width: '40px',
              sort: 'string',
              format (value) {
                switch (value) {
                  case 'ULR':
                    return 'ULR'
                  case 'FLR':
                    return 'FLR'
                  case 'RCM':
                    return 'Core'
                  case 'TE':
                    return 'Elective'
                  case 'IA':
                    return 'IA'
                  case 'UE':
                    return 'UE'
                  default:
                    return ''
                }
              }
            },
            {
              label: 'Grade',
              field: 'grade',
              width: '40px',
              sort (a, b) {
                var val1, val2
                switch (a) {
                  case 'A+':
                    val1 = 13
                    break
                  case 'A':
                    val1 = 12
                    break
                  case 'A-':
                    val1 = 11
                    break
                  case 'B+':
                    val1 = 10
                    break
                  case 'B':
                    val1 = 9
                    break
                  case 'B-':
                    val1 = 8
                    break
                  case 'C+':
                    val1 = 7
                    break
                  case 'C':
                    val1 = 6
                    break
                  case 'D+':
                    val1 = 5
                    break
                  case 'D':
                    val1 = 4
                    break
                  case 'F':
                    val1 = 3
                    break
                  case 'S':
                    val1 = 2
                    break
                  case 'U':
                    val1 = 1
                    break
                  default:
                    val1 = 0
                    break
                }
                switch (b) {
                  case 'A+':
                    val2 = 13
                    break
                  case 'A':
                    val2 = 12
                    break
                  case 'A-':
                    val2 = 11
                    break
                  case 'B+':
                    val2 = 10
                    break
                  case 'B':
                    val2 = 9
                    break
                  case 'B-':
                    val2 = 8
                    break
                  case 'C+':
                    val2 = 7
                    break
                  case 'C':
                    val2 = 6
                    break
                  case 'D+':
                    val2 = 5
                    break
                  case 'D':
                    val2 = 4
                    break
                  case 'F':
                    val2 = 3
                    break
                  case 'S':
                    val2 = 2
                    break
                  case 'U':
                    val2 = 1
                    break
                  default:
                    val2 = 0
                    break
                }
                return val1 - val2
              }
            },
            {
              label: 'S/U',
              field: 'su_option',
              width: '35px',
              sort: 'boolean',
              format (value) {
                if (value) {
                  return 'Yes'
                }
                else {
                  return 'No'
                }
              }
            },
            {
              label: 'Final Grade',
              field: 'final_grade',
              width: '70px',
              sort (a, b) {
                var val1, val2
                switch (a) {
                  case 'A+':
                    val1 = 13
                    break
                  case 'A':
                    val1 = 12
                    break
                  case 'A-':
                    val1 = 11
                    break
                  case 'B+':
                    val1 = 10
                    break
                  case 'B':
                    val1 = 9
                    break
                  case 'B-':
                    val1 = 8
                    break
                  case 'C+':
                    val1 = 7
                    break
                  case 'C':
                    val1 = 6
                    break
                  case 'D+':
                    val1 = 5
                    break
                  case 'D':
                    val1 = 4
                    break
                  case 'F':
                    val1 = 3
                    break
                  case 'S':
                    val1 = 2
                    break
                  case 'U':
                    val1 = 1
                    break
                  default:
                    val1 = 0
                    break
                }
                switch (b) {
                  case 'A+':
                    val2 = 13
                    break
                  case 'A':
                    val2 = 12
                    break
                  case 'A-':
                    val2 = 11
                    break
                  case 'B+':
                    val2 = 10
                    break
                  case 'B':
                    val2 = 9
                    break
                  case 'B-':
                    val2 = 8
                    break
                  case 'C+':
                    val2 = 7
                    break
                  case 'C':
                    val2 = 6
                    break
                  case 'D+':
                    val2 = 5
                    break
                  case 'D':
                    val2 = 4
                    break
                  case 'F':
                    val2 = 3
                    break
                  case 'S':
                    val2 = 2
                    break
                  case 'U':
                    val2 = 1
                    break
                  default:
                    val2 = 0
                    break
                }
                return val1 - val2
              }
            },
            {
              label: 'Points',
              field: 'final_grade',
              width: '50px',
              sort (a, b) {
                var val1, val2
                switch (a) {
                  case 'A+':
                    val1 = 11
                    break
                  case 'A':
                    val1 = 10
                    break
                  case 'A-':
                    val1 = 9
                    break
                  case 'B+':
                    val1 = 8
                    break
                  case 'B':
                    val1 = 7
                    break
                  case 'B-':
                    val1 = 6
                    break
                  case 'C+':
                    val1 = 5
                    break
                  case 'C':
                    val1 = 4
                    break
                  case 'D+':
                    val1 = 3
                    break
                  case 'D':
                    val1 = 2
                    break
                  case 'F':
                    val1 = 1
                    break
                  default:
                    val1 = 0
                    break
                }
                switch (b) {
                  case 'A+':
                    val2 = 11
                    break
                  case 'A':
                    val2 = 10
                    break
                  case 'A-':
                    val2 = 9
                    break
                  case 'B+':
                    val2 = 8
                    break
                  case 'B':
                    val2 = 7
                    break
                  case 'B-':
                    val2 = 6
                    break
                  case 'C+':
                    val2 = 5
                    break
                  case 'C':
                    val2 = 4
                    break
                  case 'D+':
                    val2 = 3
                    break
                  case 'D':
                    val2 = 2
                    break
                  case 'F':
                    val2 = 1
                    break
                  default:
                    val2 = 0
                    break
                }
                return val1 - val2
              },
              format (value) {
                switch (value) {
                  case 'A+':
                    return 5.0.toPrecision(2)
                  case 'A':
                    return 5.0.toPrecision(2)
                  case 'A-':
                    return 4.5.toPrecision(2)
                  case 'B+':
                    return 4.0.toPrecision(2)
                  case 'B':
                    return 3.5.toPrecision(2)
                  case 'B-':
                    return 3.0.toPrecision(2)
                  case 'C+':
                    return 2.5.toPrecision(2)
                  case 'C':
                    return 2.0.toPrecision(2)
                  case 'D+':
                    return 1.5.toPrecision(2)
                  case 'D':
                    return 1.0.toPrecision(2)
                  case 'F':
                    return 0.0.toPrecision(2)
                  default:
                    return 'N/A'
                }
              }
            }
          ]
        },
        add_data: {
          code: '',
          credits: 4,
          type: 'ULR',
          grade: 'Planned',
          su_option: false,
          type_options: [
            {
              label: 'University Requirement',
              value: 'ULR'
            },
            {
              label: 'Faculty Requirement',
              value: 'FLR'
            },
            {
              label: 'Required/Core Module',
              value: 'RCM'
            },
            {
              label: 'Technical Elective',
              value: 'TE'
            },
            {
              label: 'Industrial Attachment',
              value: 'IA'
            },
            {
              label: 'Unrestricted Elective',
              value: 'UE'
            }
          ],
          grade_options: [
            {
              label: 'Planned',
              value: 'Planned'
            },
            {
              label: 'A+',
              value: 'A+'
            },
            {
              label: 'A',
              value: 'A'
            },
            {
              label: 'A-',
              value: 'A-'
            },
            {
              label: 'B+',
              value: 'B+'
            },
            {
              label: 'B',
              value: 'B'
            },
            {
              label: 'B-',
              value: 'B-'
            },
            {
              label: 'C+',
              value: 'C+'
            },
            {
              label: 'C',
              value: 'C'
            },
            {
              label: 'D+',
              value: 'D+'
            },
            {
              label: 'D',
              value: 'D'
            },
            {
              label: 'F',
              value: 'F'
            },
            {
              label: 'CS',
              value: 'CS'
            },
            {
              label: 'CU',
              value: 'CU'
            }
          ]
        },
        edit_data: {
          index: 0,
          code: '',
          type: '',
          credits: 0,
          grade: '',
          su_option: false,
          type_options: [
            {
              label: 'University Requirement',
              value: 'ULR'
            },
            {
              label: 'Faculty Requirement',
              value: 'FLR'
            },
            {
              label: 'Required/Core Module',
              value: 'RCM'
            },
            {
              label: 'Technical Elective',
              value: 'TE'
            },
            {
              label: 'Industrial Attachment',
              value: 'IA'
            },
            {
              label: 'Unrestricted Elective',
              value: 'UE'
            }
          ],
          grade_options: [
            {
              label: 'Planned',
              value: 'Planned'
            },
            {
              label: 'A+',
              value: 'A+'
            },
            {
              label: 'A',
              value: 'A'
            },
            {
              label: 'A-',
              value: 'A-'
            },
            {
              label: 'B+',
              value: 'B+'
            },
            {
              label: 'B',
              value: 'B'
            },
            {
              label: 'B-',
              value: 'B-'
            },
            {
              label: 'C+',
              value: 'C+'
            },
            {
              label: 'C',
              value: 'C'
            },
            {
              label: 'D+',
              value: 'D+'
            },
            {
              label: 'D',
              value: 'D'
            },
            {
              label: 'F',
              value: 'F'
            },
            {
              label: 'CS',
              value: 'CS'
            },
            {
              label: 'CU',
              value: 'CU'
            }
          ]
        },
        //
        //
        //
        // Share Tab Variables
        add_share: {
          id: ''
        },
        email_share_data: {
          email: '',
          tab: 'modules',
          format: 'csv'
        },
        //
        //
        //
        // Options Tab Variables
        download_options: {
          tab: 'modules',
          format: 'pdf'
        },
        change_password_data: {
          old_password: '',
          new_password: '',
          repeat_new_password: ''
        },
        delete_data: {
          email: ''
        }
      }
    },
    validations: {
      add_data: {
        code: {required},
        code_check: {
          module_code_unique () {
            for (var i = 0; i < this.user.modules.length; i++) {
              for (var j = 0; j < this.user.modules[i].length; j++) {
                if (this.add_data.code === this.user.modules[i][j].code) {
                  return false
                }
              }
            }
            return true
          }
        }
      },
      // edit_data: {
      //   code: {required},
      //   code_check: {
      //     module_code_unique () {
      //       for (var i = 0; i < this.user.modules.length; i++) {
      //         for (var j = 0; j < this.user.modules[i].length; j++) {
      //           if (this.edit_data.code === this.user.modules[i][j].code) {
      //             return false
      //           }
      //         }
      //       }
      //       return true
      //     }
      //   }
      // },
      email_share_data: {
        email: {email}
      },
      change_password_data: {
        new_password: {required, minLength: minLength(5)},
        repeat_new_password: {sameAsPassword: sameAs('new_password')},
        old_password_check: {
          password_same () {
            if (Sjcl.decrypt(smtp_data.users.darklyght, this.user.login_data.password) === this.change_password_data.old_password) {
              return true
            }
            else {
              return false
            }
          }
        }
      }
    },
    methods: {
      //
      //
      //
      // Modules Tab Methods
      add_module_dialog () {
        this.$refs.add_dialog.open()
      },
      add_module () {
        this.$v.add_data.code.$touch()
        if (this.$v.add_data.code.$error) {
          Toast.create.negative('Module code is a required field.')
          return
        }
        this.$v.add_data.code_check.$touch()
        if (this.$v.add_data.code_check.$error) {
          Toast.create.negative('You have already taken this module. Please check again.')
          return
        }
        var new_module = {
          code: this.add_data.code,
          credits: this.add_data.credits,
          type: this.add_data.type,
          grade: this.add_data.grade,
          su_option: this.add_data.su_option,
          final_grade: ''
        }
        if (this.add_data.su_option === true) {
          if (this.add_data.grade === 'D' || this.add_data.grade === 'D+' || this.add_data.grade === 'F') {
            new_module.final_grade = 'U'
          }
          else if (this.add_data.grade !== 'Planned') {
            new_module.final_grade = 'S'
          }
          else {
            new_module.final_grade = 'Planned'
          }
        }
        else {
          new_module.final_grade = this.add_data.grade
        }
        this.user.modules[this.modules.semester - 1].push(new_module)
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('Module ' + this.add_data.code + ' added.')
        this.close_add_dialog()
      },
      close_add_dialog () {
        this.add_data.code = ''
        this.add_data.credits = 4
        this.add_data.type = 'ULR'
        this.add_data.grade = 'Planned'
        this.add_data.su_option = false
        this.$refs.add_dialog.close()
      },
      edit_modules (selection) {
        if (selection.rows.length > 1) {
          Toast.create.negative('You can only edit module one at a time.')
          return
        }
        this.edit_data.index = selection.rows[0].index
        this.edit_data.code = selection.rows[0].data.code
        this.edit_data.type = selection.rows[0].data.type
        this.edit_data.credits = selection.rows[0].data.credits
        this.edit_data.grade = selection.rows[0].data.grade
        this.edit_data.su_option = selection.rows[0].data.su_option
        this.$refs.edit_dialog.open()
      },
      update_module () {
        // this.$v.edit_data.code.$touch()
        // if (this.$v.edit_data.code.$error) {
        //   Toast.create.negative('Module code is a required field.')
        //   return
        // }
        // this.$v.edit_data.code_check.$touch()
        // if (this.$v.edit_data.code_check.$error) {
        //   Toast.create.negative('You have already taken this module. Please check again.')
        //   return
        // }
        this.user.modules[this.modules.semester - 1][this.edit_data.index].code = this.edit_data.code
        this.user.modules[this.modules.semester - 1][this.edit_data.index].credits = this.edit_data.credits
        this.user.modules[this.modules.semester - 1][this.edit_data.index].type = this.edit_data.type
        this.user.modules[this.modules.semester - 1][this.edit_data.index].grade = this.edit_data.grade
        this.user.modules[this.modules.semester - 1][this.edit_data.index].su_option = this.edit_data.su_option
        if (this.edit_data.su_option === true) {
          if (this.edit_data.grade === 'D' || this.edit_data.grade === 'D+' || this.edit_data.grade === 'F') {
            this.user.modules[this.modules.semester - 1][this.edit_data.index].final_grade = 'U'
          }
          else {
            this.user.modules[this.modules.semester - 1][this.edit_data.index].final_grade = 'S'
          }
        }
        else {
          this.user.modules[this.modules.semester - 1][this.edit_data.index].final_grade = this.edit_data.grade
        }
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('Module ' + this.edit_data.code + ' saved.')
        this.$refs.edit_dialog.close()
      },
      autocomplete (terms, done) {
        setTimeout(() => {
          done(Utils.filter(terms, {field: 'value', list: parse_modules()}))
        }, 150)
      },
      su_activate (selection) {
        selection.rows.forEach(row => {
          if (row.data.su_option === false) {
            row.data.su_option = true
            if (row.data.grade === 'D' || row.data.grade === 'D+' || row.data.grade === 'F') {
              row.data.final_grade = 'U'
            }
            else if (row.data.grade !== 'Planned') {
              row.data.final_grade = 'S'
            }
            else {
              row.data.final_grade = 'Planned'
            }
          }
        })
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('S/U option exercised on ' + selection.rows.length + ' module(s).')
      },
      su_deactivate (selection) {
        selection.rows.forEach(row => {
          if (row.data.su_option === true) {
            row.data.su_option = false
            row.data.final_grade = row.data.grade
          }
        })
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('S/U option removed on ' + selection.rows.length + ' module(s).')
      },
      delete_modules (selection) {
        for (var i = selection.rows.length - 1; i >= 0; i--) {
          this.user.modules[this.modules.semester - 1].splice(selection.rows[i].index, 1)
        }
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive(selection.rows.length + ' module(s) deleted.')
      },
      add_semester () {
        this.user.modules.splice(this.modules.semester, 0, [])
        this.modules.semester = this.modules.semester + 1
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('Semester ' + this.modules.semester + ' added.')
      },
      remove_semester () {
        if (this.modules.semester === 1) {
          Toast.create.negative('Cannot delete the first semester.')
          return
        }
        this.modules.semester = this.modules.semester - 1
        this.user.modules.splice(this.modules.semester, 1)
        app_users.update({
          id: sessionStorage['username'],
          modules: this.user.modules
        })
        Toast.create.positive('Semester ' + (this.modules.semester + 1) + ' removed.')
      },
      //
      //
      //
      // Sharing Tab Methods
      add_shared_with_others_dialog () {
        this.$refs.add_share.open()
      },
      add_shared_with_others () {
        app_users.find(this.add_share.id).fetch().subscribe(result => {
          if (result && this.user.shared_with_others.indexOf(result.id) === -1) {
            this.user.shared_with_others.push(result.id)
            result.shared_with_you.push(this.user.id)
            app_users.update({
              id: this.user.id,
              shared_with_others: this.user.shared_with_others
            })
            app_users.update({
              id: result.id,
              shared_with_you: result.shared_with_you
            })
            Toast.create.positive('Shared your module plan with ' + this.add_share.id + '.')
            this.add_shared_with_others_dialog_close()
          }
          else if (result && this.user.shared_with_others.indexOf(result.id) !== -1) {
            Toast.create.negative('Module plan already shared with ' + result.id)
          }
          else {
            app_users.find({email: this.add_share.id}).fetch().subscribe(result => {
              if (result && this.user.shared_with_others.indexOf(result.id) === -1) {
                this.user.shared_with_others.push(result.id)
                result.shared_with_you.push(this.user.id)
                app_users.update({
                  id: this.user.id,
                  shared_with_others: this.user.shared_with_others
                })
                app_users.update({
                  id: result.id,
                  shared_with_you: result.shared_with_you
                })
                Toast.create.positive('Shared your module plan with ' + this.add_share.id + '.')
                this.add_shared_with_others_dialog_close()
              }
              else if (result && this.user.shared_with_others.indexOf(result.id) !== -1) {
                Toast.create.negative('Module plan already shared with ' + result.id)
              }
              else {
                Toast.create.negative('User cannot be found')
              }
            })
          }
        })
      },
      add_shared_with_others_dialog_close () {
        this.add_share.id = ''
        this.$refs.add_share.close()
      },
      remove_shared_with_others (index) {
        var id = this.user.shared_with_others[index]
        app_users.find(id).fetch().subscribe(result => {
          if (result && this.user.shared_with_others.indexOf(result.id) !== -1) {
            this.user.shared_with_others.splice(index, 1)
            result.shared_with_you.splice(result.shared_with_you.indexOf(this.user.id), 1)
            app_users.update({
              id: this.user.id,
              shared_with_others: this.user.shared_with_others
            })
            app_users.update({
              id: result.id,
              shared_with_you: result.shared_with_you
            })
            Toast.create.positive('Unshared your module plan with ' + result.id + '.')
            this.add_shared_with_others_dialog_close()
          }
          else {
            Toast.create.negative('User cannot be found')
          }
        })
      },
      view_shared_with_you (index) {
        var id = this.user.shared_with_you[index]
        window.open('http://localhost:8080/#/view/' + id, '_blank')
        app_users.find(id).fetch().subscribe(result => {
          if (result && result.shared_with_others.indexOf(this.user.id) === -1) {
            Toast.create.negative('An authorisation error has occurred. Refresh the page and try again.')
          }
        })
      },
      remove_shared_with_you (index) {
        var id = this.user.shared_with_you[index]
        app_users.find(id).fetch().subscribe(result => {
          if (result && this.user.shared_with_you.indexOf(result.id) !== -1) {
            this.user.shared_with_you.splice(index, 1)
            result.shared_with_others.splice(result.shared_with_others.indexOf(this.user.id), 1)
            app_users.update({
              id: this.user.id,
              shared_with_you: this.user.shared_with_you
            })
            app_users.update({
              id: result.id,
              shared_with_others: result.shared_with_others
            })
            Toast.create.positive('Removed your privilege to view the module plan of ' + result.id + '.')
          }
          else {
            Toast.create.negative('User cannot be found')
          }
        })
      },
      email_share () {
        this.$v.email_share_data.email.$touch()
        if (this.$v.email_share_data.email.$error) {
          Toast.create.negative('This is not a valid email. Please check again.')
          return
        }
        if (this.email_share_data.tab === 'modules') {
          if (this.email_share_data.format === 'pdf') {
            this.email_share_modules_pdf()
          }
          else if (this.email_share_data.format === 'csv') {
            this.email_share_modules_csv()
          }
          else if (this.email_share_data.format === 'png') {
            this.email_share_modules_png()
          }
        }
        else if (this.email_share_data.tab === 'data') {
          if (this.email_share_data.format === 'pdf') {
            this.email_share_data_pdf()
          }
          else if (this.email_share_data.format === 'csv') {
            this.email_share_data_csv()
          }
          else if (this.email_share_data.format === 'png') {
            this.email_share_data_png()
          }
        }
      },
      // email_share_modules_pdf () {
      //   var num_modules = 0
      //   var num_semesters = 0
      //   for (var i = 0; i < this.user.modules.length; i++) {
      //     num_semesters = num_semesters + 1
      //     for (var j = 0; j < this.user.modules[i].length; j++) {
      //       num_modules = num_modules + 1
      //     }
      //   }
      //   var modules_image = document.getElementById('text-canvas')
      //   var modules_context = modules_image.getContext('2d')
      //   modules_image.width = 800
      //   modules_image.height = num_modules * 40 + num_semesters * 120 + 140
      //   modules_context.fillStyle = '#FFFFFF'
      //   modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
      //   modules_context.fillStyle = '#FFA500'
      //   modules_context.fillRect(0, 0, 800, 100)
      //   modules_context.fillStyle = '#000000'
      //   modules_context.font = 'bold 50px Roboto'
      //   modules_context.fillText('Module Plan by Semester', 10, 60)
      //   modules_context.font = 'bold 30px Roboto'
      //   modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
      //   var row = 170
      //   for (i = 0; i < this.user.modules.length; i++) {
      //     var total_credits = 0
      //     for (j = 0; j < this.user.modules[i].length; j++) {
      //       total_credits = total_credits + this.user.modules[i][j].credits
      //     }
      //     modules_context.fillStyle = '#1E90FF'
      //     modules_context.fillRect(0, row - 30, 800, 40)
      //     modules_context.fillStyle = '#000000'
      //     modules_context.font = 'bold 30px Roboto'
      //     modules_context.fillText('Semester ' + (i + 1), 10, row)
      //     modules_context.fillText(total_credits, 410, row)
      //     row = row + 80
      //     for (j = 0; j < this.user.modules[i].length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(this.user.modules[i][j].code, 10, row)
      //       modules_context.fillText(this.user.modules[i][j].credits, 410, row)
      //       modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
      //       row = row + 40
      //     }
      //     row = row + 40
      //   }
      //   var image_pdf = modules_context.canvas.toDataURL('image/jpeg', 0.2)
      //   var doc = new jsPDF() // eslint-disable-line
      //   var pdf = doc.addImage(image_pdf, 'JPEG', 0, 0).output('datauristring')
      //   Loading.show()
      //   Axios.request({
      //     url: smtp_data.endpoint,
      //     method: 'post',
      //     auth: {
      //       username: 'darklyght',
      //       password: smtp_data.users.darklyght
      //     },
      //     params: {
      //       subject: (this.user.id + '\'s Module Plan on Moduler'),
      //       from: 'mailer@darklyght.com',
      //       to: this.email_share_data.email,
      //       text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
      //       attachment_type: 'pdf',
      //       attachment_filename: (this.user.id + '.pdf'),
      //       attachment_content: pdf
      //     }
      //   }).then((response) => {
      //     Loading.hide()
      //     if (response.status === 200 && response.data.status === 'success') {
      //       Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
      //     }
      //     else {
      //       Toast.create.negative('There has been an error. Please contact the server administrator.')
      //     }
      //   })
      // },
      // email_share_modules_png () {
      //   var num_modules = 0
      //   var num_semesters = 0
      //   for (var i = 0; i < this.user.modules.length; i++) {
      //     num_semesters = num_semesters + 1
      //     for (var j = 0; j < this.user.modules[i].length; j++) {
      //       num_modules = num_modules + 1
      //     }
      //   }
      //   var modules_image = document.getElementById('text-canvas')
      //   var modules_context = modules_image.getContext('2d')
      //   modules_image.width = 800
      //   modules_image.height = num_modules * 40 + num_semesters * 120 + 140
      //   modules_context.fillStyle = '#FFFFFF'
      //   modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
      //   modules_context.fillStyle = '#FFA500'
      //   modules_context.fillRect(0, 0, 800, 100)
      //   modules_context.fillStyle = '#000000'
      //   modules_context.font = 'bold 50px Roboto'
      //   modules_context.fillText('Module Plan by Semester', 10, 60)
      //   modules_context.font = 'bold 30px Roboto'
      //   modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
      //   var row = 170
      //   for (i = 0; i < this.user.modules.length; i++) {
      //     var total_credits = 0
      //     for (j = 0; j < this.user.modules[i].length; j++) {
      //       total_credits = total_credits + this.user.modules[i][j].credits
      //     }
      //     modules_context.fillStyle = '#1E90FF'
      //     modules_context.fillRect(0, row - 30, 800, 40)
      //     modules_context.fillStyle = '#000000'
      //     modules_context.font = 'bold 30px Roboto'
      //     modules_context.fillText('Semester ' + (i + 1), 10, row)
      //     modules_context.fillText(total_credits, 410, row)
      //     row = row + 80
      //     for (j = 0; j < this.user.modules[i].length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(this.user.modules[i][j].code, 10, row)
      //       modules_context.fillText(this.user.modules[i][j].credits, 410, row)
      //       modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
      //       row = row + 40
      //     }
      //     row = row + 40
      //   }
      //   var image = modules_context.canvas.toDataURL('image/png')
      //   Loading.show()
      //   Axios.request({
      //     url: smtp_data.endpoint,
      //     method: 'post',
      //     auth: {
      //       username: 'darklyght',
      //       password: smtp_data.users.darklyght
      //     },
      //     params: {
      //       subject: (this.user.id + '\'s Module Plan on Moduler'),
      //       from: 'mailer@darklyght.com',
      //       to: this.email_share_data.email,
      //       text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
      //       attachment_type: 'pdf',
      //       attachment_filename: (this.user.id + '.png'),
      //       attachment_content: image
      //     }
      //   }).then((response) => {
      //     Loading.hide()
      //     if (response.status === 200 && response.data.status === 'success') {
      //       Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
      //     }
      //     else {
      //       Toast.create.negative('There has been an error. Please contact the server administrator.')
      //     }
      //   })
      // },
      email_share_modules_csv () {
        var str = ''
        str = str + 'Module Plan by Semester\n\n'
        for (var i = 1; i <= this.user.modules.length; i++) {
          str = str + 'Semester ' + i + '\n\n'
          for (var j = 0; j < this.user.modules[i - 1].length; j++) {
            str = str + ',' + this.user.modules[i - 1][j].code + ',' + this.user.modules[i - 1][j].final_grade + ',' + this.user.modules[i - 1][j].credits + '\n'
          }
          str = str + '\n'
        }
        Loading.show()
        Axios.request({
          url: smtp_data.endpoint,
          method: 'post',
          auth: {
            username: 'darklyght',
            password: smtp_data.users.darklyght
          },
          params: {
            subject: (this.user.id + '\'s Module Plan on Moduler'),
            from: 'mailer@darklyght.com',
            to: this.email_share_data.email,
            text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
            attachment_type: 'csv',
            attachment_filename: (this.user.id + '.csv'),
            attachment_content: str
          }
        }).then((response) => {
          Loading.hide()
          if (response.status === 200 && response.data.status === 'success') {
            Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
          }
          else {
            Toast.create.negative('There has been an error. Please contact the server administrator.')
          }
        })
      },
      // email_share_data_pdf () {
      //   var modules = [{
      //     type: 'University Level Requirements',
      //     mods: this.ulr_mods
      //   },
      //   {
      //     type: 'Faculty Level Requirements',
      //     mods: this.flr_mods
      //   },
      //   {
      //     type: 'Core Modules',
      //     mods: this.rcm_mods
      //   },
      //   {
      //     type: 'Technical Electives',
      //     mods: this.te_mods
      //   },
      //   {
      //     type: 'Industrial Attachment',
      //     mods: this.ia_mods
      //   },
      //   {
      //     type: 'Unrestricted Electives',
      //     mods: this.ue_mods
      //   }]
      //   var num_modules = 0
      //   for (var i = 0; i < this.user.modules.length; i++) {
      //     for (var j = 0; j < this.user.modules[i].length; j++) {
      //       num_modules = num_modules + 1
      //     }
      //   }
      //   var modules_image = document.getElementById('text-canvas')
      //   var modules_context = modules_image.getContext('2d')
      //   modules_image.width = 800
      //   modules_image.height = num_modules * 40 + modules.length * 240 + 140
      //   modules_context.fillStyle = '#FFFFFF'
      //   modules_context.fillRect(0, 0, 900, num_modules * 40 + modules.length * 240 + 140)
      //   modules_context.fillStyle = '#FFA500'
      //   modules_context.fillRect(0, 0, 800, 100)
      //   modules_context.fillStyle = '#000000'
      //   modules_context.font = 'bold 50px Roboto'
      //   modules_context.fillText('Module Plan by Module Type', 10, 60)
      //   modules_context.font = 'bold 30px Roboto'
      //   modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
      //   var row = 170
      //   for (i = 0; i < modules.length; i++) {
      //     modules_context.fillStyle = '#1E90FF'
      //     modules_context.fillRect(0, row - 30, 800, 40)
      //     modules_context.fillStyle = '#000000'
      //     modules_context.font = 'bold 30px Roboto'
      //     modules_context.fillText(modules[i].type, 10, row)
      //     modules_context.fillText(modules[i].mods.credits_done, 610, row)
      //     modules_context.fillText('(' + (modules[i].mods.credits_done + modules[i].mods.credits_planned) + ')', 710, row)
      //     row = row + 80
      //     modules_context.fillText('Modules Completed', 10, row)
      //     row = row + 40
      //     for (j = 0; j < modules[i].mods.modules_done.length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(modules[i].mods.modules_done[j].code, 10, row)
      //       modules_context.fillText(modules[i].mods.modules_done[j].grade, 410, row)
      //       modules_context.fillText(modules[i].mods.modules_done[j].credits, 610, row)
      //       row = row + 40
      //     }
      //     modules_context.font = 'bold 30px Roboto'
      //     row = row + 40
      //     modules_context.fillText('Modules Planned', 10, row)
      //     row = row + 40
      //     for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(modules[i].mods.modules_planned[j].code, 10, row)
      //       modules_context.fillText(modules[i].mods.modules_planned[j].grade, 410, row)
      //       modules_context.fillText(modules[i].mods.modules_planned[j].credits, 710, row)
      //       row = row + 40
      //     }
      //     row = row + 40
      //   }
      //   var image_pdf = modules_context.canvas.toDataURL('image/jpeg')
      //   var doc = new jsPDF() // eslint-disable-line
      //   var pdf = doc.addImage(image_pdf, 'JPEG', 0, 0).output('datauristring')
      //   Loading.show()
      //   Axios.request({
      //     url: smtp_data.endpoint,
      //     method: 'post',
      //     auth: {
      //       username: 'darklyght',
      //       password: smtp_data.users.darklyght
      //     },
      //     params: {
      //       subject: (this.user.id + '\'s Module Plan on Moduler'),
      //       from: 'mailer@darklyght.com',
      //       to: this.email_share_data.email,
      //       text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
      //       attachment_type: 'pdf',
      //       attachment_filename: (this.user.id + '.pdf'),
      //       attachment_content: pdf
      //     }
      //   }).then((response) => {
      //     Loading.hide()
      //     if (response.status === 200 && response.data.status === 'success') {
      //       Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
      //     }
      //     else {
      //       Toast.create.negative('There has been an error. Please contact the server administrator.')
      //     }
      //   })
      // },
      // email_share_data_png () {
      //   var modules = [{
      //     type: 'University Level Requirements',
      //     mods: this.ulr_mods
      //   },
      //   {
      //     type: 'Faculty Level Requirements',
      //     mods: this.flr_mods
      //   },
      //   {
      //     type: 'Core Modules',
      //     mods: this.rcm_mods
      //   },
      //   {
      //     type: 'Technical Electives',
      //     mods: this.te_mods
      //   },
      //   {
      //     type: 'Industrial Attachment',
      //     mods: this.ia_mods
      //   },
      //   {
      //     type: 'Unrestricted Electives',
      //     mods: this.ue_mods
      //   }]
      //   var num_modules = 0
      //   for (var i = 0; i < this.user.modules.length; i++) {
      //     for (var j = 0; j < this.user.modules[i].length; j++) {
      //       num_modules = num_modules + 1
      //     }
      //   }
      //   var modules_image = document.getElementById('text-canvas')
      //   var modules_context = modules_image.getContext('2d')
      //   modules_image.width = 800
      //   modules_image.height = num_modules * 40 + modules.length * 240 + 140
      //   modules_context.fillStyle = '#FFFFFF'
      //   modules_context.fillRect(0, 0, 900, num_modules * 40 + modules.length * 240 + 140)
      //   modules_context.fillStyle = '#FFA500'
      //   modules_context.fillRect(0, 0, 800, 100)
      //   modules_context.fillStyle = '#000000'
      //   modules_context.font = 'bold 50px Roboto'
      //   modules_context.fillText('Module Plan by Module Type', 10, 60)
      //   modules_context.font = 'bold 30px Roboto'
      //   modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
      //   var row = 170
      //   for (i = 0; i < modules.length; i++) {
      //     modules_context.fillStyle = '#1E90FF'
      //     modules_context.fillRect(0, row - 30, 800, 40)
      //     modules_context.fillStyle = '#000000'
      //     modules_context.font = 'bold 30px Roboto'
      //     modules_context.fillText(modules[i].type, 10, row)
      //     modules_context.fillText(modules[i].mods.credits_done, 610, row)
      //     modules_context.fillText('(' + (modules[i].mods.credits_done + modules[i].mods.credits_planned) + ')', 710, row)
      //     row = row + 80
      //     modules_context.fillText('Modules Completed', 10, row)
      //     row = row + 40
      //     for (j = 0; j < modules[i].mods.modules_done.length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(modules[i].mods.modules_done[j].code, 10, row)
      //       modules_context.fillText(modules[i].mods.modules_done[j].grade, 410, row)
      //       modules_context.fillText(modules[i].mods.modules_done[j].credits, 610, row)
      //       row = row + 40
      //     }
      //     modules_context.font = 'bold 30px Roboto'
      //     row = row + 40
      //     modules_context.fillText('Modules Planned', 10, row)
      //     row = row + 40
      //     for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
      //       modules_context.font = 'normal 30px \'Roboto Condensed\''
      //       modules_context.fillText(modules[i].mods.modules_planned[j].code, 10, row)
      //       modules_context.fillText(modules[i].mods.modules_planned[j].grade, 410, row)
      //       modules_context.fillText(modules[i].mods.modules_planned[j].credits, 710, row)
      //       row = row + 40
      //     }
      //     row = row + 40
      //   }
      //   var image = modules_context.canvas.toDataURL('image/png')
      //   Loading.show()
      //   Axios.request({
      //     url: smtp_data.endpoint,
      //     method: 'post',
      //     auth: {
      //       username: 'darklyght',
      //       password: smtp_data.users.darklyght
      //     },
      //     params: {
      //       subject: (this.user.id + '\'s Module Plan on Moduler'),
      //       from: 'mailer@darklyght.com',
      //       to: this.email_share_data.email,
      //       text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
      //       attachment_type: 'pdf',
      //       attachment_filename: (this.user.id + '.png'),
      //       attachment_content: image
      //     }
      //   }).then((response) => {
      //     Loading.hide()
      //     console.log(response)
      //     if (response.status === 200 && response.data.status === 'success') {
      //       Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
      //     }
      //     else {
      //       Toast.create.negative('There has been an error. Please contact the server administrator.')
      //     }
      //   })
      // },
      email_share_data_csv () {
        var str = ''
        str = str + 'Module Plan by Module Type\n\n'
        var modules = [{
          type: 'University Level Requirements',
          mods: this.ulr_mods
        },
        {
          type: 'Faculty Level Requirements',
          mods: this.flr_mods
        },
        {
          type: 'Core Modules',
          mods: this.rcm_mods
        },
        {
          type: 'Technical Electives',
          mods: this.te_mods
        },
        {
          type: 'Industrial Attachment',
          mods: this.ia_mods
        },
        {
          type: 'Unrestricted Electives',
          mods: this.ue_mods
        }]
        for (var i = 0; i < modules.length; i++) {
          str = str + modules[i].type + ',,,' + modules[i].mods.credits_done + ',' + modules[i].mods.credits_planned + '\n\n'
          str = str + ',Completed Modules\n'
          for (var j = 0; j < modules[i].mods.modules_done.length; j++) {
            str = str + ',' + modules[i].mods.modules_done[j].code + ',' + modules[i].mods.modules_done[j].grade + ',' + modules[i].mods.modules_done[j].credits + '\n'
          }
          str = str + '\n,Planned Modules\n'
          for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
            str = str + ',' + modules[i].mods.modules_planned[j].code + ',' + modules[i].mods.modules_planned[j].grade + ',,' + modules[i].mods.modules_planned[j].credits + '\n'
          }
          str = str + '\n'
        }
        Loading.show()
        Axios.request({
          url: smtp_data.endpoint,
          method: 'post',
          auth: {
            username: 'darklyght',
            password: smtp_data.users.darklyght
          },
          params: {
            subject: (this.user.id + '\'s Module Plan on Moduler'),
            from: 'mailer@darklyght.com',
            to: this.email_share_data.email,
            text: (this.user.id + ' has shared his/her module plan with you. The module plan is attached to the email.'),
            attachment_type: 'csv',
            attachment_filename: (this.user.id + '.csv'),
            attachment_content: str
          }
        }).then((response) => {
          Loading.hide()
          if (response.status === 200 && response.data.status === 'success') {
            Toast.create.positive('Email sent to ' + this.email_share_data.email + '.')
          }
          else {
            Toast.create.negative('There has been an error. Please contact the server administrator.')
          }
        })
      },
      //
      //
      //
      // Options Tab Methods
      download () {
        if (this.download_options.tab === 'modules') {
          if (this.download_options.format === 'pdf') {
            this.download_modules_pdf()
          }
          else if (this.download_options.format === 'csv') {
            this.download_modules_csv()
          }
          else if (this.download_options.format === 'png') {
            this.download_modules_png()
          }
        }
        else if (this.download_options.tab === 'data') {
          if (this.download_options.format === 'pdf') {
            this.download_data_pdf()
          }
          else if (this.download_options.format === 'csv') {
            this.download_data_csv()
          }
          else if (this.download_options.format === 'png') {
            this.download_data_png()
          }
        }
        Toast.create.positive('Download started')
      },
      download_modules_csv () {
        var str = ''
        str = str + 'Module Plan by Semester\n\n'
        for (var i = 1; i <= this.user.modules.length; i++) {
          str = str + 'Semester ' + i + '\n\n'
          for (var j = 0; j < this.user.modules[i - 1].length; j++) {
            str = str + ',' + this.user.modules[i - 1][j].code + ',' + this.user.modules[i - 1][j].final_grade + ',' + this.user.modules[i - 1][j].credits + '\n'
          }
          str = str + '\n'
        }
        var download_link = document.createElement('a')
        var blob = new Blob(['\ufeff', str])
        var url = URL.createObjectURL(blob)
        download_link.href = url
        download_link.download = this.user.id + '.csv'
        document.body.appendChild(download_link)
        download_link.click()
        document.body.removeChild(download_link)
      },
      download_modules_png () {
        var num_modules = 0
        var num_semesters = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          num_semesters = num_semesters + 1
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + num_semesters * 120 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Semester', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < this.user.modules.length; i++) {
          var total_credits = 0
          for (j = 0; j < this.user.modules[i].length; j++) {
            total_credits = total_credits + this.user.modules[i][j].credits
          }
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText('Semester ' + (i + 1), 10, row)
          modules_context.fillText(total_credits, 410, row)
          row = row + 80
          for (j = 0; j < this.user.modules[i].length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(this.user.modules[i][j].code, 10, row)
            modules_context.fillText(this.user.modules[i][j].credits, 410, row)
            modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
            row = row + 40
          }
          row = row + 40
        }
        var image = modules_context.canvas.toDataURL('image/png')
        var download_link = document.createElement('a')
        download_link.href = image
        download_link.download = this.user.id + '.png'
        document.body.appendChild(download_link)
        download_link.click()
        document.body.removeChild(download_link)
      },
      download_modules_pdf () {
        var num_modules = 0
        var num_semesters = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          num_semesters = num_semesters + 1
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + num_semesters * 120 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Semester', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < this.user.modules.length; i++) {
          var total_credits = 0
          for (j = 0; j < this.user.modules[i].length; j++) {
            total_credits = total_credits + this.user.modules[i][j].credits
          }
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText('Semester ' + (i + 1), 10, row)
          modules_context.fillText(total_credits, 410, row)
          row = row + 80
          for (j = 0; j < this.user.modules[i].length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(this.user.modules[i][j].code, 10, row)
            modules_context.fillText(this.user.modules[i][j].credits, 410, row)
            modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
            row = row + 40
          }
          row = row + 40
        }
        var image = modules_context.canvas.toDataURL('image/png')
        var pdf = new jsPDF() // eslint-disable-line
        pdf.addImage(image, 'PNG', 0, 0)
        pdf.save(this.user.id + '.pdf')
      },
      download_data_csv () {
        var str = ''
        str = str + 'Module Plan by Module Type\n\n'
        var modules = [{
          type: 'University Level Requirements',
          mods: this.ulr_mods
        },
        {
          type: 'Faculty Level Requirements',
          mods: this.flr_mods
        },
        {
          type: 'Core Modules',
          mods: this.rcm_mods
        },
        {
          type: 'Technical Electives',
          mods: this.te_mods
        },
        {
          type: 'Industrial Attachment',
          mods: this.ia_mods
        },
        {
          type: 'Unrestricted Electives',
          mods: this.ue_mods
        }]
        for (var i = 0; i < modules.length; i++) {
          str = str + modules[i].type + ',,,' + modules[i].mods.credits_done + ',' + modules[i].mods.credits_planned + '\n\n'
          str = str + ',Completed Modules\n'
          for (var j = 0; j < modules[i].mods.modules_done.length; j++) {
            str = str + ',' + modules[i].mods.modules_done[j].code + ',' + modules[i].mods.modules_done[j].grade + ',' + modules[i].mods.modules_done[j].credits + '\n'
          }
          str = str + '\n,Planned Modules\n'
          for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
            str = str + ',' + modules[i].mods.modules_planned[j].code + ',' + modules[i].mods.modules_planned[j].grade + ',,' + modules[i].mods.modules_planned[j].credits + '\n'
          }
          str = str + '\n'
        }
        var download_link = document.createElement('a')
        var blob = new Blob(['\ufeff', str])
        var url = URL.createObjectURL(blob)
        download_link.href = url
        download_link.download = this.user.id + '.csv'
        document.body.appendChild(download_link)
        download_link.click()
        document.body.removeChild(download_link)
      },
      download_data_png () {
        var modules = [{
          type: 'University Level Requirements',
          mods: this.ulr_mods
        },
        {
          type: 'Faculty Level Requirements',
          mods: this.flr_mods
        },
        {
          type: 'Core Modules',
          mods: this.rcm_mods
        },
        {
          type: 'Technical Electives',
          mods: this.te_mods
        },
        {
          type: 'Industrial Attachment',
          mods: this.ia_mods
        },
        {
          type: 'Unrestricted Electives',
          mods: this.ue_mods
        }]
        var num_modules = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + modules.length * 240 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + modules.length * 240 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Module Type', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < modules.length; i++) {
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText(modules[i].type, 10, row)
          modules_context.fillText(modules[i].mods.credits_done, 610, row)
          modules_context.fillText('(' + (modules[i].mods.credits_done + modules[i].mods.credits_planned) + ')', 710, row)
          row = row + 80
          modules_context.fillText('Modules Completed', 10, row)
          row = row + 40
          for (j = 0; j < modules[i].mods.modules_done.length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(modules[i].mods.modules_done[j].code, 10, row)
            modules_context.fillText(modules[i].mods.modules_done[j].grade, 410, row)
            modules_context.fillText(modules[i].mods.modules_done[j].credits, 610, row)
            row = row + 40
          }
          modules_context.font = 'bold 30px Roboto'
          row = row + 40
          modules_context.fillText('Modules Planned', 10, row)
          row = row + 40
          for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(modules[i].mods.modules_planned[j].code, 10, row)
            modules_context.fillText(modules[i].mods.modules_planned[j].grade, 410, row)
            modules_context.fillText(modules[i].mods.modules_planned[j].credits, 710, row)
            row = row + 40
          }
          row = row + 40
        }
        var image = modules_context.canvas.toDataURL('image/png')
        var download_link = document.createElement('a')
        download_link.href = image
        download_link.download = this.user.id + '.png'
        document.body.appendChild(download_link)
        download_link.click()
        document.body.removeChild(download_link)
      },
      download_data_pdf () {
        var modules = [{
          type: 'University Level Requirements',
          mods: this.ulr_mods
        },
        {
          type: 'Faculty Level Requirements',
          mods: this.flr_mods
        },
        {
          type: 'Core Modules',
          mods: this.rcm_mods
        },
        {
          type: 'Technical Electives',
          mods: this.te_mods
        },
        {
          type: 'Industrial Attachment',
          mods: this.ia_mods
        },
        {
          type: 'Unrestricted Electives',
          mods: this.ue_mods
        }]
        var num_modules = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + modules.length * 240 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + modules.length * 240 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Module Type', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < modules.length; i++) {
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText(modules[i].type, 10, row)
          modules_context.fillText(modules[i].mods.credits_done, 610, row)
          modules_context.fillText('(' + (modules[i].mods.credits_done + modules[i].mods.credits_planned) + ')', 710, row)
          row = row + 80
          modules_context.fillText('Modules Completed', 10, row)
          row = row + 40
          for (j = 0; j < modules[i].mods.modules_done.length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(modules[i].mods.modules_done[j].code, 10, row)
            modules_context.fillText(modules[i].mods.modules_done[j].grade, 410, row)
            modules_context.fillText(modules[i].mods.modules_done[j].credits, 610, row)
            row = row + 40
          }
          modules_context.font = 'bold 30px Roboto'
          row = row + 40
          modules_context.fillText('Modules Planned', 10, row)
          row = row + 40
          for (j = 0; j < modules[i].mods.modules_planned.length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(modules[i].mods.modules_planned[j].code, 10, row)
            modules_context.fillText(modules[i].mods.modules_planned[j].grade, 410, row)
            modules_context.fillText(modules[i].mods.modules_planned[j].credits, 710, row)
            row = row + 40
          }
          row = row + 40
        }
        var image = modules_context.canvas.toDataURL('image/png')
        var pdf = new jsPDF() // eslint-disable-line
        pdf.addImage(image, 'PNG', 0, 0)
        pdf.save(this.user.id + '.pdf')
      },
      update_theme () {
        var color1 = ''
        var color2 = ''
        var color3 = ''
        switch (this.user.theme) {
          case 'pink':
            color1 = 'rgba(248, 187, 208, 1.0)'
            color2 = 'rgba(136, 14, 79, 1.0)'
            color3 = 'rgba(136, 14, 79, 0.2)'
            break
          case 'indigo':
            color1 = 'rgba(197, 202, 233, 1.0)'
            color2 = 'rgba(26, 35, 126, 1.0)'
            color3 = 'rgba(26, 35, 126, 0.2)'
            break
          case 'blue':
            color1 = 'rgba(187, 222, 251, 1.0)'
            color2 = 'rgba(13, 17, 161, 1.0)'
            color3 = 'rgba(13, 17, 161, 0.2)'
            break
          case 'teal':
            color1 = 'rgba(178, 223, 219, 1.0)'
            color2 = 'rgba(0, 77, 64, 1.0)'
            color3 = 'rgba(0, 77, 64, 0.2)'
            break
          case 'orange':
            color1 = 'rgba(255, 224, 178, 1.0)'
            color2 = 'rgba(230, 81, 0, 1.0)'
            color3 = 'rgba(230, 81, 0, 0.2)'
            break
          case 'blue-grey':
            color1 = 'rgba(207, 216, 220, 1.0)'
            color2 = 'rgba(69, 90, 100, 1.0)'
            color3 = 'rgba(69, 90, 100, 0.2)'
            break
        }
        document.body.style.setProperty('--theme-color1', color1)
        document.body.style.setProperty('--theme-color2', color2)
        document.body.style.setProperty('--theme-color3', color3)
      },
      save_theme () {
        app_users.update({
          id: sessionStorage['username'],
          theme: this.user.theme
        })
        Toast.create.positive('Theme saved.')
      },
      copy_api_key () {
        document.querySelector('#api-copy-area').select()
        document.execCommand('copy')
        Toast.create.positive('API key copied to clipboard.')
      },
      regenerate_api_key () {
        app_users.update({
          id: this.user.id,
          api_key: uuid()
        })
      },
      change_password () {
        this.$v.change_password_data.old_password_check.$touch()
        if (this.$v.change_password_data.old_password_check.$error) {
          Toast.create.negative('Current password is incorrect. Please check again.')
          return
        }
        this.$v.change_password_data.new_password.$touch()
        if (this.$v.change_password_data.new_password.$error) {
          Toast.create.negative('Password must be at least 5 characters long.')
          return
        }
        this.$v.change_password_data.repeat_new_password.$touch()
        if (this.$v.change_password_data.repeat_new_password.$error) {
          Toast.create.negative('Passwords do not match. Please check again.')
          return
        }
        var login_data = {
          username: this.user.login_data.username,
          password: Sjcl.encrypt(smtp_data.users.darklyght, this.change_password_data.new_password)
        }
        app_users.update({
          id: this.user.id,
          login_data: login_data
        })
        Toast.create.positive('Password has been updated.')
        this.change_password_data.old_password = ''
        this.change_password_data.new_password = ''
        this.change_password_data.repeat_new_password = ''
      },
      delete_account () {
        app_users.find(sessionStorage['username']).fetch().subscribe(result => {
          if (result.email === this.delete_data.email) {
            app_users.remove(sessionStorage['username'])
            this.logout()
            Toast.create.positive('Account deleted.')
          }
          else {
            Toast.create.negative('Email is incorrect. Please check again.')
          }
        })
      },
      //
      //
      //
      // Logout Tab Methods
      logout () {
        if (localStorage['username']) {
          localStorage.removeItem('username')
        }
        sessionStorage.removeItem('username')
        this.$router.push({
          name: 'Index'
        })
        Toast.create.positive('Logged out.')
      },
      //
      //
      //
      // Universal Methods
      update: function (updated_info) {
        this.user = updated_info
        this.update_theme()
      }
    },
    watch: {
      '$route' (to, from) {
        if (sessionStorage['username'] && to.path.substring(9) !== sessionStorage['username']) {
          this.$router.push({
            name: 'Modules',
            params: {
              username: sessionStorage['username']
            }
          })
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.path === '/') {
        next()
      }
      else if (to.path === '/admin') {
        next(false)
      }
      else if (to.path.substring(0, 6) === '/view/') {
        var id = to.path.substring(6)
        app_users.find(id).fetch().subscribe(result => {
          if (result && result.shared_with_others.indexOf(this.user.id) !== -1) {
            next()
          }
          else {
            next(false)
          }
        })
      }
    },
    computed: {
      //
      //
      //
      // Universal Variables
      theme_bg: function () {
        switch (this.user.theme) {
          case 'pink':
            return 'bg-pink-3'
          case 'indigo':
            return 'bg-indigo-3'
          case 'blue':
            return 'bg-blue-3'
          case 'teal':
            return 'bg-teal-3'
          case 'orange':
            return 'bg-orange-3'
          case 'blue-grey':
            return 'bg-blue-grey-3'
        }
      },
      table_bg: function () {
        switch (this.user.theme) {
          case 'pink':
            return 'bg-pink-2'
          case 'indigo':
            return 'bg-indigo-2'
          case 'blue':
            return 'bg-blue-2'
          case 'teal':
            return 'bg-teal-2'
          case 'orange':
            return 'bg-orange-2'
          case 'blue-grey':
            return 'bg-blue-grey-2'
        }
      },
      modules_bg: function () {
        switch (this.user.theme) {
          case 'pink':
            return 'bg-pink-1'
          case 'indigo':
            return 'bg-indigo-1'
          case 'blue':
            return 'bg-blue-1'
          case 'teal':
            return 'bg-teal-1'
          case 'orange':
            return 'bg-orange-1'
          case 'blue-grey':
            return 'bg-blue-grey-1'
        }
      },
      //
      //
      //
      // Modules Tab Variables
      semester_text: function () {
        return 'Semester ' + this.modules.semester.toString()
      },
      semestral_cap: function () {
        var sum = 0.0
        var total_mcs = 0
        for (var i = 0; i < this.user.modules[this.modules.semester - 1].length; i++) {
          switch (this.user.modules[this.modules.semester - 1][i].final_grade) {
            case 'A+':
              sum = sum + 5.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'A':
              sum = sum + 5.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'A-':
              sum = sum + 4.5 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'B+':
              sum = sum + 4.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'B':
              sum = sum + 3.5 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'B-':
              sum = sum + 3.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'C+':
              sum = sum + 2.5 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'C':
              sum = sum + 2.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'D+':
              sum = sum + 1.5 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'D':
              sum = sum + 1.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            case 'F':
              sum = sum + 0.0 * this.user.modules[this.modules.semester - 1][i].credits
              total_mcs = total_mcs + this.user.modules[this.modules.semester - 1][i].credits
              break
            default:
              break
          }
        }
        if (sum === 0) {
          return 'N/A'
        }
        else {
          return (sum / total_mcs).toPrecision(3)
        }
      },
      add_data_preclusions: function () {
        for (var i = 0; i < Modules.length; i++) {
          if (Modules[i].code === this.add_data.code && Modules[i].preclusion !== '') {
            return Modules[i].preclusion
          }
        }
        return 'None'
      },
      add_data_prerequisites: function () {
        for (var i = 0; i < Modules.length; i++) {
          if (Modules[i].code === this.add_data.code && Modules[i].prerequisite !== '') {
            return Modules[i].prerequisite
          }
        }
        return 'None'
      },
      edit_data_preclusions: function () {
        for (var i = 0; i < Modules.length; i++) {
          if (Modules[i].code === this.edit_data.code && Modules[i].preclusion !== '') {
            return Modules[i].preclusion
          }
        }
        return 'None'
      },
      edit_data_prerequisites: function () {
        for (var i = 0; i < Modules.length; i++) {
          if (Modules[i].code === this.edit_data.code && Modules[i].prerequisite !== '') {
            return Modules[i].prerequisite
          }
        }
        return 'None'
      },
      //
      //
      //
      // Data Tab Variables
      cap: function () {
        var sum = 0.0
        var total_mcs = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            switch (this.user.modules[i][j].final_grade) {
              case 'A+':
                sum = sum + 5.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'A':
                sum = sum + 5.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'A-':
                sum = sum + 4.5 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'B+':
                sum = sum + 4.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'B':
                sum = sum + 3.5 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'B-':
                sum = sum + 3.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'C+':
                sum = sum + 2.5 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'C':
                sum = sum + 2.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'D+':
                sum = sum + 1.5 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'D':
                sum = sum + 1.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              case 'F':
                sum = sum + 0.0 * this.user.modules[i][j].credits
                total_mcs = total_mcs + this.user.modules[i][j].credits
                break
              default:
                break
            }
          }
        }
        if (sum === 0) {
          return 'N/A'
        }
        else {
          return (sum / total_mcs).toPrecision(3)
        }
      },
      total_credits: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].grade !== 'Planned') {
              result.credits_done = result.credits_done + this.user.modules[i][j].credits
            }
            else {
              result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
            }
          }
        }
        return result
      },
      ulr_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'ULR') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      },
      flr_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'FLR') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      },
      rcm_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'RCM') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      },
      te_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'TE') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      },
      ia_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'IA') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      },
      ue_mods: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0,
          modules_done: [],
          modules_planned: []
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].type === 'UE') {
              if (this.user.modules[i][j].grade !== 'Planned') {
                result.credits_done = result.credits_done + this.user.modules[i][j].credits
                result.modules_done.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
              else {
                result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
                result.modules_planned.push({
                  code: this.user.modules[i][j].code,
                  credits: this.user.modules[i][j].credits,
                  grade: this.user.modules[i][j].final_grade
                })
              }
            }
          }
        }
        return result
      }
    },
    mounted () {
      app_users.find(sessionStorage['username']).watch().subscribe(this.update)
    }
  }
</script>

<style lang="styl">
a
  color var(--theme-color2)
a:hover
  color var(--theme-color3)
table tr td a
  display block
  height 100%
  width 100%
#preload-font
  font-family Roboto Condensed
  opacity 0
  height 0
  width 0
  display inline-block
#modules-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#cap
  font-size 200%
#semester-select
  float right
  margin-top 10px
  margin-bottom 5px
#semester-text
  font-size 100%
  margin-top 8px
#text-canvas
  display none
.item-link
  height 40px
  line-height 12px
  font-size 80%
.title-inline
  width 100%
  display inline-block
  margin-bottom 5px
.left-inline
  float left
.right-inline
  float right
.center-inline
  float center
  margin 0 auto
.block-inline
  display inline-block
.right-button
  float right
  margin-top 20px
  margin-bottom 20px
  margin-left 10px
.dialog-table
  height 40px
.q-data-table
  border none
.sharing td
  border none
  border-bottom 1px solid var(--theme-color2)
  padding-left 10px
  padding-right 10px
  padding-top 0px
  padding-bottom 0px
.sharing tr:hover
  background-color var(--theme-color1)
table.q-table:not(.responsive):not(.flipped).horizontal-delimiter th, table.q-table:not(.responsive):not(.flipped).cell-delimiter th, table.q-table:not(.responsive):not(.flipped).horizontal-delimiter td, table.q-table:not(.responsive):not(.flipped).cell-delimiter td
  background var(--theme-color1)
table.q-table.responsive:not(.flipped) tr, table.q-table.responsive:not(.flipped) td
  background var(--theme-color1)
.q-data-table table thead tr
  background var(--theme-color1)
.q-data-table-selection
  color var(--theme-color2)
  background var(--theme-color3)
.q-radio input:checked + div:before
  border-color var(--theme-color2)
.q-radio input:checked + div:after
  background-color var(--theme-color2)
.q-checkbox input:checked + div:before
  background-color var(--theme-color2)
  border-color var(--theme-color2)
.q-radio input + div:before
  border-color #777777
.q-checkbox input + div:before
  border-color #777777
input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
  border-bottom 2px solid #999
/*.modal.minimized .modal-content
  background-color var(--theme-color1)*/
th
  height 50px
  font-size 120%
body
  background-color darkgrey
:root
  --theme-color1 rgba(255, 255, 255, 1.0)
  --theme-color2 rgba(255, 255, 255, 1.0)
  --theme-color3 rgba(255, 255, 255, 0.2)
  overflow-y scroll
</style>
