export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      attendance_logs: {
        Row: {
          clock_in: string | null
          clock_out: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          notes: string | null
          overtime: number | null
          project: string | null
          status: string | null
          total_hours: number | null
          updated_at: string | null
        }
        Insert: {
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date?: string
          employee_id: string
          id?: string
          notes?: string | null
          overtime?: number | null
          project?: string | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          overtime?: number | null
          project?: string | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_policies: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          id: string
          last_updated: string | null
          status: string
          title: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          status?: string
          title: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          address: string | null
          created_at: string
          currency: string | null
          email: string | null
          id: string
          industry: string | null
          name: string
          phone: string | null
          timezone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          name: string
          phone?: string | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          name?: string
          phone?: string | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          file_size: number | null
          file_url: string | null
          id: string
          is_verified: boolean | null
          mime_type: string | null
          upload_date: string | null
          user_id: string
          verified_by: string | null
          verified_date: string | null
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          upload_date?: string | null
          user_id: string
          verified_by?: string | null
          verified_date?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          upload_date?: string | null
          user_id?: string
          verified_by?: string | null
          verified_date?: string | null
        }
        Relationships: []
      }
      employee_details: {
        Row: {
          address: string | null
          bio: string | null
          birth_date: string | null
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          hire_date: string | null
          id: string
          manager_id: string | null
          profile_picture_url: string | null
          salary: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          hire_date?: string | null
          id?: string
          manager_id?: string | null
          profile_picture_url?: string | null
          salary?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          hire_date?: string | null
          id?: string
          manager_id?: string | null
          profile_picture_url?: string | null
          salary?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      employee_documents: {
        Row: {
          created_at: string | null
          document_id: string
          employee_id: string | null
          file_url: string | null
          name: string
          size: string | null
          type: string
          upload_date: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string
          employee_id?: string | null
          file_url?: string | null
          name: string
          size?: string | null
          type: string
          upload_date?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string
          employee_id?: string | null
          file_url?: string | null
          name?: string
          size?: string | null
          type?: string
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employee_emergency_contacts: {
        Row: {
          created_at: string | null
          employee_id: string | null
          id: string
          name: string
          phone: string | null
          relationship: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          name: string
          phone?: string | null
          relationship?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          name?: string
          phone?: string | null
          relationship?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_emergency_contacts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employee_employment_history: {
        Row: {
          created_at: string | null
          current: boolean | null
          department: string
          employee_id: string | null
          end_date: string | null
          id: string
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          current?: boolean | null
          department: string
          employee_id?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          title: string
        }
        Update: {
          created_at?: string | null
          current?: boolean | null
          department?: string
          employee_id?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_employment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          base_salary: number | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          email: string
          employee_id: string
          join_date: string | null
          login_access: boolean | null
          login_email: string | null
          login_password: string | null
          manager: string | null
          name: string
          phone: string | null
          profile_picture_url: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          base_salary?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email: string
          employee_id?: string
          join_date?: string | null
          login_access?: boolean | null
          login_email?: string | null
          login_password?: string | null
          manager?: string | null
          name: string
          phone?: string | null
          profile_picture_url?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          base_salary?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string
          employee_id?: string
          join_date?: string | null
          login_access?: boolean | null
          login_email?: string | null
          login_password?: string | null
          manager?: string | null
          name?: string
          phone?: string | null
          profile_picture_url?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          feedback_type: string
          id: string
          is_anonymous: boolean | null
          message: string
          rating: number | null
          status: string | null
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feedback_type: string
          id?: string
          is_anonymous?: boolean | null
          message: string
          rating?: number | null
          status?: string | null
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          feedback_type?: string
          id?: string
          is_anonymous?: boolean | null
          message?: string
          rating?: number | null
          status?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      holidays: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      hr_policies: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leave_balances: {
        Row: {
          available_days: number
          created_at: string
          employee_id: string
          id: string
          leave_type_id: string
          total_days: number
          updated_at: string
          used_days: number
          year: number
        }
        Insert: {
          available_days?: number
          created_at?: string
          employee_id: string
          id?: string
          leave_type_id: string
          total_days?: number
          updated_at?: string
          used_days?: number
          year?: number
        }
        Update: {
          available_days?: number
          created_at?: string
          employee_id?: string
          id?: string
          leave_type_id?: string
          total_days?: number
          updated_at?: string
          used_days?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_balances_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          applied_date: string | null
          comments: string | null
          created_at: string | null
          days: number
          days_requested: number
          employee_id: string | null
          end_date: string
          id: string
          leave_type: string
          leave_type_id: string | null
          reason: string | null
          reviewed_by: string | null
          reviewed_date: string | null
          start_date: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          applied_date?: string | null
          comments?: string | null
          created_at?: string | null
          days?: number
          days_requested: number
          employee_id?: string | null
          end_date: string
          id?: string
          leave_type: string
          leave_type_id?: string | null
          reason?: string | null
          reviewed_by?: string | null
          reviewed_date?: string | null
          start_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          applied_date?: string | null
          comments?: string | null
          created_at?: string | null
          days?: number
          days_requested?: number
          employee_id?: string | null
          end_date?: string
          id?: string
          leave_type?: string
          leave_type_id?: string | null
          reason?: string | null
          reviewed_by?: string | null
          reviewed_date?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_types: {
        Row: {
          annual_days: number
          carry_forward: boolean
          color: string
          created_at: string
          description: string | null
          id: string
          name: string
          requires_approval: boolean
          updated_at: string
        }
        Insert: {
          annual_days?: number
          carry_forward?: boolean
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          requires_approval?: boolean
          updated_at?: string
        }
        Update: {
          annual_days?: number
          carry_forward?: boolean
          color?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          requires_approval?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payroll: {
        Row: {
          base_salary: number
          bonuses: number
          created_at: string | null
          deductions: number
          employee_id: string
          employee_name: string
          id: string
          net_pay: number
          pay_period: string
          status: string
          updated_at: string | null
        }
        Insert: {
          base_salary?: number
          bonuses?: number
          created_at?: string | null
          deductions?: number
          employee_id: string
          employee_name: string
          id?: string
          net_pay?: number
          pay_period?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          base_salary?: number
          bonuses?: number
          created_at?: string | null
          deductions?: number
          employee_id?: string
          employee_name?: string
          id?: string
          net_pay?: number
          pay_period?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      performance_reviews: {
        Row: {
          comments: string | null
          created_at: string | null
          goals_achievement: number | null
          goals_for_next_period: string | null
          id: string
          overall_rating: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string | null
          skills_rating: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          goals_achievement?: number | null
          goals_for_next_period?: string | null
          id?: string
          overall_rating?: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id?: string | null
          skills_rating?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          goals_achievement?: number | null
          goals_for_next_period?: string | null
          id?: string
          overall_rating?: number | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string | null
          skills_rating?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          employee_id: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          position: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          employee_id?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          employee_id?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      salary_components: {
        Row: {
          created_at: string | null
          editable: boolean
          id: string
          name: string
          type: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          editable?: boolean
          id?: string
          name: string
          type: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          editable?: boolean
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      site_metrics: {
        Row: {
          created_at: string | null
          id: string
          last_updated: string | null
          total_admin_signups: number
          total_employee_signups: number
          total_visitors: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          total_admin_signups?: number
          total_employee_signups?: number
          total_visitors?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          total_admin_signups?: number
          total_employee_signups?: number
          total_visitors?: number
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string | null
          description: string
          id: string
          priority: string | null
          resolution: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_admin_signup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_employee_signup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_visitor_count: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      seed_employee_leave_balances: {
        Args: { employee_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
