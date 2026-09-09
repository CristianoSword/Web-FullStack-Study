package pb

import (
	reflect "reflect"
	sync "sync"

	proto "google.golang.org/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	descriptorpb "google.golang.org/protobuf/types/descriptorpb"
)

const (
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type LoginRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	Password string `protobuf:"bytes,2,opt,name=password,proto3" json:"password,omitempty"`
}

func (x *LoginRequest) Reset() {
	*x = LoginRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_auth_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LoginRequest) String() string { return protoimpl.X.MessageStringOf(x) }
func (*LoginRequest) ProtoMessage()    {}

func (x *LoginRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_auth_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

func (*LoginRequest) Descriptor() ([]byte, []int) {
	return file_api_proto_auth_proto_rawDescGZIP(), []int{0}
}

func (x *LoginRequest) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *LoginRequest) GetPassword() string {
	if x != nil {
		return x.Password
	}
	return ""
}

type LoginResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AccessToken   string `protobuf:"bytes,1,opt,name=access_token,json=accessToken,proto3" json:"access_token,omitempty"`
	UserId        string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Username      string `protobuf:"bytes,3,opt,name=username,proto3" json:"username,omitempty"`
	Role          string `protobuf:"bytes,4,opt,name=role,proto3" json:"role,omitempty"`
	ExpiresAtUnix int64  `protobuf:"varint,5,opt,name=expires_at_unix,json=expiresAtUnix,proto3" json:"expires_at_unix,omitempty"`
}

func (x *LoginResponse) Reset() {
	*x = LoginResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_auth_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LoginResponse) String() string { return protoimpl.X.MessageStringOf(x) }
func (*LoginResponse) ProtoMessage()    {}

func (x *LoginResponse) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_auth_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

func (*LoginResponse) Descriptor() ([]byte, []int) {
	return file_api_proto_auth_proto_rawDescGZIP(), []int{1}
}

func (x *LoginResponse) GetAccessToken() string {
	if x != nil {
		return x.AccessToken
	}
	return ""
}

func (x *LoginResponse) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *LoginResponse) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *LoginResponse) GetRole() string {
	if x != nil {
		return x.Role
	}
	return ""
}

func (x *LoginResponse) GetExpiresAtUnix() int64 {
	if x != nil {
		return x.ExpiresAtUnix
	}
	return 0
}

type ValidateTokenRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AccessToken string `protobuf:"bytes,1,opt,name=access_token,json=accessToken,proto3" json:"access_token,omitempty"`
}

func (x *ValidateTokenRequest) Reset() {
	*x = ValidateTokenRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_auth_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ValidateTokenRequest) String() string { return protoimpl.X.MessageStringOf(x) }
func (*ValidateTokenRequest) ProtoMessage()    {}

func (x *ValidateTokenRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_auth_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

func (*ValidateTokenRequest) Descriptor() ([]byte, []int) {
	return file_api_proto_auth_proto_rawDescGZIP(), []int{2}
}

func (x *ValidateTokenRequest) GetAccessToken() string {
	if x != nil {
		return x.AccessToken
	}
	return ""
}

type ValidateTokenResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Valid         bool   `protobuf:"varint,1,opt,name=valid,proto3" json:"valid,omitempty"`
	UserId        string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Username      string `protobuf:"bytes,3,opt,name=username,proto3" json:"username,omitempty"`
	Role          string `protobuf:"bytes,4,opt,name=role,proto3" json:"role,omitempty"`
	ExpiresAtUnix int64  `protobuf:"varint,5,opt,name=expires_at_unix,json=expiresAtUnix,proto3" json:"expires_at_unix,omitempty"`
}

func (x *ValidateTokenResponse) Reset() {
	*x = ValidateTokenResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_auth_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ValidateTokenResponse) String() string { return protoimpl.X.MessageStringOf(x) }
func (*ValidateTokenResponse) ProtoMessage()    {}

func (x *ValidateTokenResponse) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_auth_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

func (*ValidateTokenResponse) Descriptor() ([]byte, []int) {
	return file_api_proto_auth_proto_rawDescGZIP(), []int{3}
}

func (x *ValidateTokenResponse) GetValid() bool {
	if x != nil {
		return x.Valid
	}
	return false
}

func (x *ValidateTokenResponse) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *ValidateTokenResponse) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *ValidateTokenResponse) GetRole() string {
	if x != nil {
		return x.Role
	}
	return ""
}

func (x *ValidateTokenResponse) GetExpiresAtUnix() int64 {
	if x != nil {
		return x.ExpiresAtUnix
	}
	return 0
}

var File_api_proto_auth_proto protoreflect.FileDescriptor

var file_api_proto_auth_proto_rawDesc = fileAPIProtoAuthProtoRawDesc()

func fileAPIProtoAuthProtoRawDesc() []byte {
	fileDescriptor := &descriptorpb.FileDescriptorProto{
		Syntax:  proto.String("proto3"),
		Name:    proto.String("api/proto/auth.proto"),
		Package: proto.String("auth.v1"),
		Options: &descriptorpb.FileOptions{
			GoPackage: proto.String("github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/pb;pb"),
		},
		MessageType: []*descriptorpb.DescriptorProto{
			{
				Name: proto.String("LoginRequest"),
				Field: []*descriptorpb.FieldDescriptorProto{
					{
						Name:     proto.String("username"),
						JsonName: proto.String("username"),
						Number:   proto.Int32(1),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("password"),
						JsonName: proto.String("password"),
						Number:   proto.Int32(2),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
				},
			},
			{
				Name: proto.String("LoginResponse"),
				Field: []*descriptorpb.FieldDescriptorProto{
					{
						Name:     proto.String("access_token"),
						JsonName: proto.String("accessToken"),
						Number:   proto.Int32(1),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("user_id"),
						JsonName: proto.String("userId"),
						Number:   proto.Int32(2),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("username"),
						JsonName: proto.String("username"),
						Number:   proto.Int32(3),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("role"),
						JsonName: proto.String("role"),
						Number:   proto.Int32(4),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("expires_at_unix"),
						JsonName: proto.String("expiresAtUnix"),
						Number:   proto.Int32(5),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_INT64.Enum(),
					},
				},
			},
			{
				Name: proto.String("ValidateTokenRequest"),
				Field: []*descriptorpb.FieldDescriptorProto{
					{
						Name:     proto.String("access_token"),
						JsonName: proto.String("accessToken"),
						Number:   proto.Int32(1),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
				},
			},
			{
				Name: proto.String("ValidateTokenResponse"),
				Field: []*descriptorpb.FieldDescriptorProto{
					{
						Name:     proto.String("valid"),
						JsonName: proto.String("valid"),
						Number:   proto.Int32(1),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_BOOL.Enum(),
					},
					{
						Name:     proto.String("user_id"),
						JsonName: proto.String("userId"),
						Number:   proto.Int32(2),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("username"),
						JsonName: proto.String("username"),
						Number:   proto.Int32(3),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("role"),
						JsonName: proto.String("role"),
						Number:   proto.Int32(4),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
					},
					{
						Name:     proto.String("expires_at_unix"),
						JsonName: proto.String("expiresAtUnix"),
						Number:   proto.Int32(5),
						Label:    descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
						Type:     descriptorpb.FieldDescriptorProto_TYPE_INT64.Enum(),
					},
				},
			},
		},
		Service: []*descriptorpb.ServiceDescriptorProto{
			{
				Name: proto.String("AuthService"),
				Method: []*descriptorpb.MethodDescriptorProto{
					{
						Name:       proto.String("Login"),
						InputType:  proto.String(".auth.v1.LoginRequest"),
						OutputType: proto.String(".auth.v1.LoginResponse"),
					},
					{
						Name:       proto.String("ValidateToken"),
						InputType:  proto.String(".auth.v1.ValidateTokenRequest"),
						OutputType: proto.String(".auth.v1.ValidateTokenResponse"),
					},
				},
			},
		},
	}
	data, _ := proto.Marshal(fileDescriptor)
	return data
}

var (
	file_api_proto_auth_proto_rawDescOnce sync.Once
	file_api_proto_auth_proto_rawDescData = file_api_proto_auth_proto_rawDesc
)

func file_api_proto_auth_proto_rawDescGZIP() []byte {
	file_api_proto_auth_proto_rawDescOnce.Do(func() {
		file_api_proto_auth_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_auth_proto_rawDescData)
	})
	return file_api_proto_auth_proto_rawDescData
}

var file_api_proto_auth_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_api_proto_auth_proto_goTypes = []any{
	(*LoginRequest)(nil),
	(*LoginResponse)(nil),
	(*ValidateTokenRequest)(nil),
	(*ValidateTokenResponse)(nil),
}
var file_api_proto_auth_proto_depIdxs = []int32{
	0,
	1,
	2,
	3,
}

func init() { file_api_proto_auth_proto_init() }
func file_api_proto_auth_proto_init() {
	if File_api_proto_auth_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_api_proto_auth_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*LoginRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_proto_auth_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*LoginResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_proto_auth_proto_msgTypes[2].Exporter = func(v any, i int) any {
			switch v := v.(*ValidateTokenRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_proto_auth_proto_msgTypes[3].Exporter = func(v any, i int) any {
			switch v := v.(*ValidateTokenResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_api_proto_auth_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_api_proto_auth_proto_goTypes,
		DependencyIndexes: file_api_proto_auth_proto_depIdxs,
		MessageInfos:      file_api_proto_auth_proto_msgTypes,
	}.Build()
	File_api_proto_auth_proto = out.File
	file_api_proto_auth_proto_rawDesc = nil
	file_api_proto_auth_proto_goTypes = nil
	file_api_proto_auth_proto_depIdxs = nil
}
